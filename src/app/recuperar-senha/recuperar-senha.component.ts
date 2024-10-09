import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.css'
})
export class RecuperarSenhaComponent {

  email: string = '';
  message: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    const users = this.userService.getUserData(); // Obtem a lista de usuários do serviço

    const user = users.find(user => user.email === this.email); // Procura pelo usuário com o e-mail fornecido

    if (user) {
      this.message = "E-mail de alteração de senha enviado com sucesso";
      this.email = '';
    } else {
      this.message = "Email não cadastrado";
    }
  }
}
