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
  cadastroForm!: FormGroup;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nomeUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpfUsuario: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.userService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: () => {
          this.message = 'Usuário cadastrado com sucesso!';
          this.errorMessage = null;
          this.cadastroForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = 'Ocorreu um erro ao cadastrar. Tente novamente.';
          this.message = null;
          console.error('Erro ao cadastrar:', err);
        }
      });
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
      this.message = null;
    }
  }
}
