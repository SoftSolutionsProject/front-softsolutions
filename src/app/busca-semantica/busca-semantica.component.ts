import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BuscaService } from '../_service/busca.service';
import { BuscaItem, BuscaVozResponse } from '../_service/busca.types';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Component({
  selector: 'app-busca-semantica',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './busca-semantica.component.html',
  styleUrl: './busca-semantica.component.css'
})
export class BuscaSemanticaComponent implements OnInit {
  termo = '';
  transcricao = '';
  resultados: BuscaItem[] = [];
  carregando = false;
  erro = '';
  ouvindo = false;
  navegadorSuportaVoz = false;
  voiceMeta: BuscaVozResponse | null = null;

  private recognition: any = null;
  private readonly isBrowser: boolean;

  constructor(
    private buscaService: BuscaService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.navegadorSuportaVoz = !!SpeechRecognition;
    if (!SpeechRecognition) return;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pt-BR';
    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      this.ngZone.run(() => {
        this.ouvindo = true;
        this.erro = '';
        this.transcricao = '';
        this.voiceMeta = null;
      });
    };

    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += text;
        else interimTranscript += text;
      }

      this.ngZone.run(() => {
        const textoAtual = (finalTranscript || interimTranscript).trim();
        this.transcricao = textoAtual;
        this.termo = textoAtual;
      });
    };

    this.recognition.onerror = (event: any) => {
      this.ngZone.run(() => {
        this.ouvindo = false;
        this.erro = `Erro no reconhecimento de voz: ${event.error}`;
      });
    };

    this.recognition.onend = () => {
      this.ngZone.run(() => {
        this.ouvindo = false;
      });

      const textoFinal = this.transcricao.trim();
      if (textoFinal) this.buscarVozPorTexto(textoFinal);
    };
  }

  buscarTexto(): void {
    const query = this.termo.trim();

    if (!query) {
      this.erro = 'Digite um termo para buscar.';
      this.resultados = [];
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.transcricao = '';
    this.resultados = [];
    this.voiceMeta = null;

    this.buscaService.buscarTexto(query).subscribe({
      next: (res) => {
        this.resultados = res.results ?? [];
        this.carregando = false;
        if (!this.resultados.length) this.erro = 'Nenhum resultado encontrado.';
      },
      error: (err) => {
        this.erro = this.formatHttpError(err, 'Não foi possível realizar a busca.');
        this.carregando = false;
      }
    });
  }

  iniciarBuscaVoz(): void {
    if (!this.isBrowser || !this.recognition) {
      this.erro = 'Seu navegador não suporta busca por voz.';
      return;
    }

    this.erro = '';
    this.transcricao = '';
    this.resultados = [];
    this.voiceMeta = null;

    try {
      this.recognition.start();
    } catch {
      this.erro = 'Não foi possível iniciar a busca por voz.';
    }
  }

  pararBuscaVoz(): void {
    if (this.recognition && this.ouvindo) {
      this.recognition.stop();
    }
  }

  private buscarVozPorTexto(texto: string): void {
    const cleaned = texto.trim();
    if (!cleaned) return;

    this.carregando = true;
    this.erro = '';
    this.resultados = [];

    this.buscaService.buscarPorVoz(cleaned).subscribe({
      next: (res) => {
        this.voiceMeta = res;
        this.transcricao = res.originalText ?? cleaned;
        this.termo = res.searchQuery ?? cleaned;
        this.resultados = res.results ?? [];
        this.carregando = false;
        if (!this.resultados.length) this.erro = 'Nenhum resultado encontrado para sua busca.';
      },
      error: (err) => {
        this.erro = this.formatHttpError(err, 'Não foi possível processar a busca por voz.');
        this.carregando = false;
      }
    });
  }

  private formatHttpError(err: any, fallback: string): string {
    if (err?.status === 0) return 'Falha de rede: o frontend não conseguiu acessar a API.';
    if (err?.status === 404) return 'Endpoint não encontrado. Verifique a URL da API.';
    if (err?.status === 500) return 'Erro interno na API. Verifique os logs do backend.';
    return err?.error?.message || err?.message || fallback;
  }
}
