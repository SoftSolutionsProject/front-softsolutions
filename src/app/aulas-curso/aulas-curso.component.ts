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
  aulaAtual: any = null;
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
      error: (err: any) => console.error('Erro ao carregar curso:', err)
    });

    this.bservice.listarInscricoesUsuario().subscribe({
      next: (inscricoes: any[]) => {
        this.inscricao = inscricoes.find(i => i.curso?.id === idCurso && i.status === 'ativo');
        if (this.inscricao) {
          this.atualizarProgresso();
          this.verificarCertificadoBackend();
        }
      },
      error: (err: any) => console.error('Erro ao carregar inscrições:', err)
    });
  }

  carregarModulos(idCurso: number): void {
    this.bservice.listarModulosEAulasDoCurso(idCurso).subscribe({
      next: (modulos: any[]) => {
        this.modulos = modulos;
        this.curso.modulos = modulos;
        this.definirAulaInicial();
      },
      error: (err: any) => console.error('Erro ao carregar módulos e aulas:', err)
    });
  }

  definirAulaInicial(): void {
    const aulasLineares = this.getTodasAulasLineares();
    const progresso = this.inscricao?.progressoAulas || [];

    const aulaNaoConcluida = aulasLineares.find((aula: any) =>
      !progresso.some((p: any) => p.aula?.id === aula.id && p.concluida)
    );

    const aulaInicial = aulaNaoConcluida || aulasLineares[0];
    if (aulaInicial?.videoUrl) {
      this.playAula(aulaInicial.videoUrl, aulaInicial);
    }
  }

  playAula(videoUrl: string, aula?: any): void {
    if (videoUrl) {
      this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      this.aulaAtual = aula || null;
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    } else {
      console.warn('URL de vídeo inválida.');
    }
  }

  alternarConclusaoAula(idAula: number, concluida: boolean): void {
    if (!this.inscricao) return;

    if (this.certificadoEmitido && !concluida) {
      alert('Não é possível desmarcar aulas após a emissão do certificado.');
      return;
    }

    const acao = concluida ? this.bservice.concluirAula : this.bservice.desmarcarAula;
    const aulaMarcada = this.getTodasAulasLineares().find(a => a.id === idAula);

    acao.call(this.bservice, this.inscricao.id, idAula).subscribe({
      next: () => {
        this.atualizarInscricao();
        this.atualizarProgresso();
        if (concluida && aulaMarcada) {
          this.playProximaAula(aulaMarcada);
        }
      },
      error: (err) => console.error('Erro ao atualizar aula:', err)
    });
  }

  playProximaAula(aulaAtual: any): void {
    const aulasLineares = this.getTodasAulasLineares();
    const indexAtual = aulasLineares.findIndex(a => a.id === aulaAtual.id);
    const proximaAula = aulasLineares[indexAtual + 1];
    if (proximaAula?.videoUrl) {
      this.playAula(proximaAula.videoUrl, proximaAula);
    }
  }

  getTodasAulasLineares(): any[] {
    return this.curso?.modulos?.flatMap((modulo: any) => modulo.aulas) || [];
  }

  isAulaConcluida(idAula: number): boolean {
    const progresso = this.inscricao?.progressoAulas || [];
    return progresso.some((p: any) => p.aula?.id === idAula && p.concluida);
  }

  atualizarInscricao(): void {
    this.bservice.listarInscricoesUsuario().subscribe({
      next: (inscricoes: any[]) => {
        this.inscricao = inscricoes.find(i => i.curso?.id === this.curso.id && i.status === 'ativo');
      },
      error: (err: any) => console.error('Erro ao atualizar inscrição:', err)
    });
  }

  atualizarProgresso(): void {
    if (!this.inscricao) return;
    this.bservice.obterProgresso(this.inscricao.id).subscribe({
      next: (dados: any) => this.progresso = Math.round(dados.progresso),
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
    if (!this.inscricao) return;

    this.bservice.getCertificado(this.inscricao.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.certificadoEmitido = true;
      },
      error: (err) => console.error('Erro ao abrir certificado:', err)
    });
  }

  getCheckboxValue(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  verificarAvaliacao(idCurso: number): void {
    this.bservice.getMinhaAvaliacao(idCurso).subscribe({
      next: (avaliacao: any) => {
        this.avaliacaoExistente = avaliacao;
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

    const request = this.avaliacaoExistente?.id
      ? this.bservice.atualizarAvaliacao(this.avaliacaoExistente.id, payload)
      : this.bservice.avaliarCurso(payload);

    request.subscribe({
      next: () => {
        alert('Avaliação registrada com sucesso!');
        this.verificarAvaliacao(this.curso.id);
      },
      error: (err) => {
        console.error('Erro ao registrar avaliação:', err);
        alert('Erro ao enviar avaliação.');
      }
    });
  }
}
