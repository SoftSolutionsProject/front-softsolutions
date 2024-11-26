import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_service/user.service';


@Component({
  selector: 'app-detalhes-curso',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './detalhes-curso.component.html',
  styleUrl: './detalhes-curso.component.css'
})

export class DetalhesCursoComponent implements OnInit {
  curso: any = null; // Dados do curso
  inscricoes: any[] = []; // Inscrições do usuário
  isLoading = true; // Controle de carregamento
  userId = Number(localStorage.getItem('_idUser')); // ID do usuário autenticado

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const idCurso = this.route.snapshot.paramMap.get('id');
    if (idCurso) {
      this.carregarCurso(idCurso);
      this.carregarInscricoes();
    }
  }

  carregarCurso(idCurso: string): void {
    this.userService.getCursos().subscribe(
      (cursos) => {
        this.curso = cursos.find((curso) => curso._idCurso === Number(idCurso));
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar o curso:', error);
        this.isLoading = false;
      }
    );
  }

  carregarInscricoes(): void {
    this.userService.getInscricoes(this.userId).subscribe(
      (inscricoes) => {
        this.inscricoes = inscricoes;
      },
      (error) => {
        console.error('Erro ao carregar inscrições:', error);
      }
    );
  }

  inscrever(): void {
    if (!this.userId) {
      alert('É necessário estar logado para se inscrever.');
      return;
    }

    this.userService
      .inscreverCurso(this.curso._idCurso, this.userId)
      .subscribe(
        (response) => {
          alert('Inscrição realizada com sucesso!');
          this.carregarInscricoes(); // Recarrega as inscrições do usuário
        },
        (error) => {
          console.error('Erro ao realizar inscrição:', error);
          alert(error.message || 'Erro ao realizar inscrição. Tente novamente.');
        }
      );
  }


  cancelarInscricao(): void {
    this.userService
      .cancelarInscricao(this.userId, this.curso._idCurso)
      .subscribe(
        () => {
          alert('Inscrição cancelada com sucesso!');
          this.carregarInscricoes();
        },
        (error) => {
          console.error('Erro ao cancelar inscrição:', error);
          alert('Erro ao cancelar inscrição. Tente novamente.');
        }
      );
  }

  isInscrito(): boolean {
    return this.inscricoes.some((i) => i._idCurso === this.curso._idCurso);
  }

}
