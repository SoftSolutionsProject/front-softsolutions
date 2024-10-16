import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_service/user.service';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  usuario: any = {
    nomeUsuario: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: '',
    }
  };

  userId: number = 0; // Inicializa o ID do usuário

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtém o ID do usuário a partir da rota
    this.userId = +this.route.snapshot.paramMap.get('idUser')!;
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    console.log(`Buscando dados do usuário com ID: ${this.userId}`);
    this.userService.getUsuario(this.userId).subscribe(data => {
      console.log('Dados do usuário recebidos:', data);
      this.usuario = data;
    }, error => {
      console.error('Erro ao carregar dados do usuário:', error);
    });
  }

  atualizarUsuario() {
    this.userService.atualizarUsuario(this.userId, this.usuario).subscribe(response => {
      console.log('Usuário atualizado com sucesso:', response);
    }, error => {
      console.error('Erro ao atualizar usuário:', error);
    });
  }
}
