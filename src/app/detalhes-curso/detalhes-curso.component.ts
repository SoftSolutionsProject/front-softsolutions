import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BService } from '../_service/bservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalhes-curso',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './detalhes-curso.component.html',
  styleUrl: './detalhes-curso.component.css'
})
export class DetalhesCursoComponent implements OnInit {
  curso: any = null;
  inscricoes: any[] = [];
  isLoading = true;
  userId = Number(localStorage.getItem('_idUser'));
  avaliacoes: any[] = [];
  quantidadeInscritos = 0; // ✅ Nova propriedade

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bservice: BService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idCurso = this.route.snapshot.paramMap.get('id');
    if (idCurso) {
      const id = Number(idCurso);
      this.carregarCurso(id);
      this.carregarInscricoes();
    }
  }

carregarCurso(idCurso: number): void {
  this.bservice.obterCurso(idCurso).subscribe({
    next: (curso) => {
      this.curso = curso;

      if (this.curso?.modulos?.length) {
        this.curso.modulos.sort((a: any, b: any) => a.id - b.id);
        this.curso.modulos.forEach((modulo: any) => {
          if (modulo.aulas?.length) {
            modulo.aulas.sort((a: any, b: any) => a.id - b.id);
          }
        });
      }

      this.carregarAvaliacoes(idCurso);

      this.bservice.obterQuantidadeInscritos(idCurso).subscribe({
        next: (res) => this.quantidadeInscritos = res.quantidadeInscritos,
        error: (err) => console.error('Erro ao buscar inscritos:', err)
      });

      this.isLoading = false;
    },
    error: (err) => {
      console.error('Erro ao carregar curso:', err);
      this.isLoading = false;
    }
  });
}


  carregarAvaliacoes(idCurso: number): void {
    this.bservice.listarAvaliacoesPorCurso(idCurso).subscribe({
      next: (avaliacoes) => {
        this.avaliacoes = avaliacoes || [];
      },
      error: (err) => {
        console.error('Erro ao carregar avaliações:', err);
      }
    });
  }

  carregarInscricoes(): void {
    this.bservice.listarInscricoesUsuario().subscribe({
      next: (inscricoes) => {
        this.inscricoes = inscricoes.filter(i => i.status === 'ativo');
      },
      error: (err) => {
        console.error('Erro ao carregar inscrições:', err);
      }
    });
  }

  inscrever(): void {
    if (!this.userId) {
      this.snackBar.open('É necessário estar logado para se inscrever.', 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.bservice.inscreverUsuario(this.curso.id).subscribe({
      next: () => {
        this.snackBar.open('Inscrição realizada com sucesso!', undefined, {
          duration: 3100,
          panelClass: ['snackbar-success']
        });
        this.carregarInscricoes();
        this.carregarCurso(this.curso.id); // ✅ Recarrega curso p/ atualizar inscritos
      },
      error: (err) => {
        console.error('Erro ao se inscrever:', err);
        this.snackBar.open(
          err.message || 'Erro ao se inscrever. Tente novamente.',
          undefined,
          { duration: 3000, panelClass: ['snackbar-error'] }
        );
      }
    });
  }

  cancelarInscricao(): void {
    const inscricao = this.inscricoes.find(i => i.curso?.id === this.curso.id);
    if (!inscricao) {
      this.snackBar.open('Inscrição não encontrada.', undefined, {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.bservice.cancelarInscricao(inscricao.id).subscribe({
      next: () => {
        this.snackBar.open('Inscrição cancelada com sucesso!', undefined, {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.carregarInscricoes();
        this.carregarCurso(this.curso.id); // ✅ Recarrega curso p/ atualizar inscritos
      },
      error: (err) => {
        console.error('Erro ao cancelar inscrição:', err);
        this.snackBar.open(
          'Erro ao cancelar inscrição. Tente novamente.',
          undefined,
          { duration: 3000, panelClass: ['snackbar-error'] }
        );
      }
    });
  }

  isInscrito(): boolean {
    return this.inscricoes.some(i => i.curso?.id === this.curso.id);
  }

  assistirCurso(): void {
    if (this.curso?.id) {
      this.router.navigate(['/curso', this.curso.id, 'aulas']);
    } else {
      this.snackBar.open('Curso inválido. Tente novamente.', undefined, {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
