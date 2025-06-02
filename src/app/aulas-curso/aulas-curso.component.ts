import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { BService } from '../_service/bservice.service';

@Component({
  selector: 'app-aulas-curso',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './aulas-curso.component.html',
  styleUrl: './aulas-curso.component.css'
})
export class AulasCursoComponent implements OnInit {
  curso: any;
  modulos: any[] = [];
  inscricao: any;
  currentVideoUrl: SafeResourceUrl | undefined;
  userId: number = parseInt(localStorage.getItem('_idUser') || '0');

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private bservice: BService
  ) {}

  ngOnInit(): void {
    const idCurso = Number(this.route.snapshot.params['id']);

    this.bservice.obterCurso(idCurso).subscribe({
      next: (curso: any) => {
        this.curso = curso;
        this.carregarModulos(idCurso);
      },
      error: (err: any) => {
        console.error('Erro ao carregar curso:', err);
      }
    });

    this.bservice.listarInscricoesUsuario().subscribe({
      next: (inscricoes: any[]) => {
        this.inscricao = inscricoes.find((i: any) => i.curso?.id === idCurso && i.status === 'ativo');
      },
      error: (err: any) => {
        console.error('Erro ao carregar inscrições:', err);
      }
    });
  }

  carregarModulos(idCurso: number): void {
  this.bservice.listarModulosEAulasDoCurso(idCurso).subscribe({
    next: (modulos: any[]) => {
      this.modulos = modulos;
      this.curso.modulos = modulos;
    },
    error: (err: any) => {
      console.error('Erro ao carregar módulos e aulas:', err);
    }
  });
}


  playAula(videoUrl: string): void {
    if (videoUrl) {
      this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    } else {
      console.warn('URL de vídeo inválida.');
    }
  }

  alternarConclusaoAula(idAula: number, concluida: boolean): void {
  if (!this.inscricao) {
    console.warn('Usuário não inscrito no curso.');
    return;
  }

  if (concluida) {
    this.bservice.concluirAula(this.inscricao.id, idAula).subscribe({
      next: () => {
        console.log('Aula marcada como concluída.');
        this.atualizarInscricao();
      },
      error: (err) => console.error('Erro ao marcar aula como concluída:', err)
    });
  } else {
    this.bservice.desmarcarAula(this.inscricao.id, idAula).subscribe({
      next: () => {
        console.log('Aula desmarcada como concluída.');
        this.atualizarInscricao();
      },
      error: (err) => console.error('Erro ao desmarcar aula como concluída:', err)
    });
  }
}

isAulaConcluida(idAula: number): boolean {
  const progresso = this.inscricao?.progressoAulas || [];
  const aulaProgresso = progresso.find((p: any) => p.aula?.id === idAula);
  return aulaProgresso?.concluida || false;
}

atualizarInscricao(): void {
  this.bservice.listarInscricoesUsuario().subscribe({
    next: (inscricoes: any[]) => {
      this.inscricao = inscricoes.find((i: any) => i.curso?.id === this.curso.id && i.status === 'ativo');
    },
    error: (err: any) => {
      console.error('Erro ao atualizar inscrição:', err);
    }
  });
}

getCheckboxValue(event: Event): boolean {
  return (event.target as HTMLInputElement).checked;
}


}
