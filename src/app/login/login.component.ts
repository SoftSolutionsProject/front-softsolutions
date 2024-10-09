import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';  // Importa o serviço

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MaterialModule, CommonModule],
})
export class LoginComponent {

  constructor(private router: Router, private userService: UserService) {}  // Injeta o serviço

  errorMessage: string | null = null;

  onLoginSubmit(event: Event) {
    event.preventDefault();
    const emailInput = (document.getElementById('inputEmail') as HTMLInputElement).value;
    const senhaInput = (document.getElementById('inputSenha') as HTMLInputElement).value;

    const user = this.userService.validateUser(emailInput, senhaInput);  // Usa o serviço

    if (user) {
      this.router.navigate(['/perfil']);
    } else {
      this.errorMessage = "Verifique seu e-mail e senha ou cadastre-se.";
    }
  }
}
