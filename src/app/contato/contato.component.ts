import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  contatoForm!: FormGroup;
  message: string | null = null;
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:4000/email/suporte';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contatoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contatoForm.valid) {
      this.http.post(this.apiUrl, this.contatoForm.value).subscribe({
        next: () => {
          this.message = 'E-mail enviado com sucesso!';
          this.errorMessage = null;
          this.contatoForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.message = null;

          if (err.status === 0) {
            this.errorMessage = 'Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.';
          } else if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Erro ao enviar o e-mail. Tente novamente.';
          }
        }
      });
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
    }
  }
}
