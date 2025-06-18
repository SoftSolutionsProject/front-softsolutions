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
  progresso: number | null = null;
  certificadoEmitido: boolean = false;
  jaAvaliou: boolean = false;
  avaliacaoExistente: any = null;

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
        this.verificarAvaliacao(idCurso);
      },
      error: (err: any) => {
        console.error('Erro ao carregar curso:', err);
      }
    });

    this.bservice.listarInscricoesUsuario().subscribe({
      next: (inscricoes: any[]) => {
        this.inscricao = inscricoes.find((i: any) => i.curso?.id === idCurso && i.status === 'ativo');
        if (this.inscricao) {
          this.atualizarProgresso();
          this.verificarCertificadoBackend();
        }
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

    if (this.certificadoEmitido && !concluida) {
      alert('Não é possível desmarcar aulas após a emissão do certificado.');
      return;
    }

    const acao = concluida ? this.bservice.concluirAula : this.bservice.desmarcarAula;

    acao.call(this.bservice, this.inscricao.id, idAula).subscribe({
      next: () => {
        this.atualizarInscricao();
        this.atualizarProgresso();
      },
      error: (err) => {
        console.error('Erro ao atualizar aula:', err);
      }
    });
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

  atualizarProgresso(): void {
    if (!this.inscricao) return;
    this.bservice.obterProgresso(this.inscricao.id).subscribe({
      next: (dados: any) => {
        this.progresso = Math.round(dados.progresso);
      },
      error: (err) => console.error('Erro ao obter progresso:', err)
    });
  }

  verificarCertificadoBackend(): void {
    this.bservice.getCertificado(this.inscricao.id).subscribe({
      next: () => this.certificadoEmitido = true,
      error: () => this.certificadoEmitido = false
    });
  }

  verCertificado(): void {
    if (!this.inscricao) {
      console.warn('Inscrição não encontrada!');
      return;
    }

    const idInscricao = this.inscricao.id;

    this.bservice.getCertificado(idInscricao).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.certificadoEmitido = true;
      },
      error: (err) => {
        console.error('Erro ao abrir certificado:', err);
      }
    });
  }

  getCheckboxValue(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  verificarAvaliacao(idCurso: number): void {
    this.bservice.getMinhaAvaliacao(idCurso).subscribe({
      next: (avaliacao: any) => {
        this.avaliacaoExistente = avaliacao; // salva o objeto inteiro!
        this.jaAvaliou = !!avaliacao;
      },
      error: (err) => {
        console.error('Erro ao verificar avaliação:', err);
        this.avaliacaoExistente = null;
        this.jaAvaliou = false;
      }
    });
  }

  avaliarCurso(): void {
    const nota = prompt('Dê uma nota de 1 a 5:');
    const comentario = prompt('Deixe um comentário:');

    if (!nota || isNaN(+nota) || +nota < 1 || +nota > 5) {
      alert('Nota inválida!');
      return;
    }

    const payload = {
      nota: +nota,
      comentario: comentario || '',
      cursoId: this.curso.id
    };

    if (this.avaliacaoExistente && this.avaliacaoExistente.id) {
      // PATCH para alterar
      this.bservice.atualizarAvaliacao(this.avaliacaoExistente.id, payload).subscribe({
        next: () => {
          alert('Avaliação atualizada com sucesso!');
          this.verificarAvaliacao(this.curso.id); // revalida para manter o ID atualizado!
        },
        error: (err) => {
          console.error('Erro ao atualizar avaliação:', err);
          alert('Erro ao atualizar avaliação.');
        }
      });
    } else {
      // POST para criar
      this.bservice.avaliarCurso(payload).subscribe({
        next: () => {
          alert('Avaliação enviada com sucesso!');
          this.verificarAvaliacao(this.curso.id); // revalida para capturar o ID novo!
        },
        error: (err) => {
          console.error('Erro ao enviar avaliação:', err);
          alert('Erro ao enviar avaliação.');
        }
      });
    }
  }
}
