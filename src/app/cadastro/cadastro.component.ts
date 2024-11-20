import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../_service/user.service';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup; // Formulário reativo
  message: string | null = null; // Mensagem de sucesso
  errorMessage: string | null = null; // Mensagem de erro global

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nomeUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Validação do e-mail no frontend
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpfUsuario: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.userService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: () => {
          this.message = 'Cadastro realizado com sucesso!';
          this.errorMessage = null; // Limpa erros anteriores
          this.cadastroForm.reset(); // Reseta o formulário
        },
        error: (err: HttpErrorResponse) => {
          this.message = null;
          if (err.status === 400 && err.error?.message) {
            this.errorMessage = err.error.message; // Mensagem do backend
          } else {
            this.errorMessage = 'Ocorreu um erro ao cadastrar. Tente novamente.';
          }
        },
      });
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
    }
  }
}
