import { Component } from '@angular/core';
import { BService } from '../_service/bservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.css'
})
export class CertificadosComponent {
  numeroSerie: string = '';
  resultado: any = null;
  mensagemErro: string = '';

  constructor(private bservice: BService) {}

  consultarCertificado(): void {
    if (!this.numeroSerie.trim()) {
      this.mensagemErro = 'Informe o número de série.';
      this.resultado = null;
      return;
    }

    this.bservice.consultarCertificadoPorNumeroSerie(this.numeroSerie)
      .subscribe({
        next: (res) => {
          this.resultado = res;
          this.mensagemErro = '';
        },
        error: (err) => {
          this.resultado = null;
          this.mensagemErro = err.error?.message || 'Certificado não encontrado.';
        }
      });
  }
}
