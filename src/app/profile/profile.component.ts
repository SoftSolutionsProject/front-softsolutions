import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { UserService, Usuario, Inscricao } from '../_service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  inscricoes: Inscricao[] = [];
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      nomeUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      endereco: this.fb.group({
        rua: [''],
        numero: [''],
        bairro: [''],
        cidade: [''],
        estado: [''],
        pais: ['']
      })
    });
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProfile();
    this.loadInscricoes();
  }

  loadProfile() {
    this.userService.getProfile(this.userId).subscribe(
      (user: Usuario) => {
        this.profileForm.patchValue(user);
      },
      (error) => {
        console.error('Erro ao carregar perfil:', error);
        this.showSnackBar('Erro ao carregar perfil. Tente novamente mais tarde.');
      }
    );
  }

  loadInscricoes() {
    this.userService.getInscricoes(this.userId).subscribe(
      (inscricoes: Inscricao[]) => {
        this.inscricoes = inscricoes;
        if (inscricoes.length === 0) {
          console.log('Nenhuma inscrição encontrada para este usuário.');
          // Opcionalmente, você pode mostrar uma mensagem amigável para o usuário
          this.showSnackBar('Você ainda não tem inscrições em cursos.');
        }
      },
      (error) => {
        console.error('Erro ao carregar inscrições:', error);
        this.showSnackBar('Erro ao carregar inscrições. Tente novamente mais tarde.');
      }
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.userId, this.profileForm.value)
        .subscribe(
          (response: Usuario) => {
            console.log('Perfil atualizado com sucesso', response);
            this.showSnackBar('Perfil atualizado com sucesso!');
            this.loadProfile(); // Recarrega o perfil para exibir as informações atualizadas
          },
          (error) => {
            console.error('Erro ao atualizar perfil:', error);
            this.showSnackBar('Erro ao atualizar perfil. Tente novamente.');
          }
        );
    } else {
      this.showSnackBar('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  cancelarInscricao(moduleId: number) {
    this.userService.cancelarInscricao(this.userId, moduleId)
      .subscribe(
        () => {
          console.log('Inscrição cancelada com sucesso');
          this.showSnackBar('Inscrição cancelada com sucesso!');
          this.loadInscricoes(); // Recarrega as inscrições para atualizar a lista
        },
        (error) => {
          console.error('Erro ao cancelar inscrição:', error);
          this.showSnackBar('Erro ao cancelar inscrição. Tente novamente.');
        }
      );
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
