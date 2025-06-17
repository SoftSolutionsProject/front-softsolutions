import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BService } from '../_service/bservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private bservice: BService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
      this.bservice.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: () => {
          this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
            duration: 3500,
            panelClass: ['snackbar-success']
          });
          this.errorMessage = null;
          this.cadastroForm.reset();

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.status === 400 && err.error?.message
            ? err.error.message
            : 'Ocorreu um erro ao cadastrar. Tente novamente.';
        },
      });
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
    }
  }
}
