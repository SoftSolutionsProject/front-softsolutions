import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BService } from '../_service/bservice.service';

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
  inscricoes: any[] = [];
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private bservice: BService,
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
    this.bservice.getProfile(this.userId).subscribe(
      (user) => {
        this.profileForm.patchValue(user);
      },
      (error) => {
        console.error('Erro ao carregar perfil:', error);
        this.showSnackBar('Erro ao carregar perfil. Tente novamente mais tarde.');
      }
    );
  }

  loadInscricoes() {
    this.bservice.listarInscricoesUsuario().subscribe(
      (dados) => {
        const ativas = dados.filter(insc => insc.status === 'ativo');
        this.inscricoes = this.bservice.mapearInscricoes(ativas);
      },
      (error) => {
        console.error('Erro ao carregar inscrições:', error);
        this.inscricoes = [];
      }
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.bservice.updateProfile(this.userId, this.profileForm.value).subscribe(
        () => {
          this.showSnackBar('Perfil atualizado com sucesso!');
          this.loadProfile();
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

  cancelarInscricao(idInscricao: number) {
    this.bservice.cancelarInscricao(idInscricao).subscribe(
      () => {
        this.showSnackBar('Inscrição cancelada com sucesso!');
        this.loadInscricoes();
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
