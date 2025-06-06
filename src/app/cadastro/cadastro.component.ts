import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BService } from '../_service/bservice.service';

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

  constructor(private formBuilder: FormBuilder, private bservice: BService) {}


  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nomeUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpfUsuario: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log('Enviando cadastro:', this.cadastroForm.value);
      this.bservice.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: () => {
          this.message = 'Cadastro realizado com sucesso!';
          this.errorMessage = null;
          this.cadastroForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.message = null;
          if (err.status === 400 && err.error?.message) {
            this.errorMessage = err.error.message;
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
