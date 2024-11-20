import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_service/user.service';



@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MaterialModule, CommonModule, FormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      this.userService.login(email, senha).subscribe({
        next: () => {
          this.router.navigate(['/perfil']); // Redireciona para o perfil após login
        },
        error: err => {
          this.errorMessage = 'Login ou senha inválidos.';
          console.error('Erro no login:', err);
        }
      });
    }
  }
}

