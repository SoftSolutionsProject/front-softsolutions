import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CursosComponent } from './cursos/cursos.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { CursoDesenvolvimentoWebComponent } from './curso-desenvolvimento-web/curso-desenvolvimento-web.component';
import { ContatoComponent } from './contato/contato.component';
import { CursoDesenvolvimentoAppComponent } from './curso-desenvolvimento-app/curso-desenvolvimento-app.component';
import { CursoPythonInicianteComponent } from './curso-python-iniciante/curso-python-iniciante.component';
import { CursosDesenvolvimentoWebExecutarComponent } from './cursos-executar/cursos-desenvolvimento-web-executar/cursos-desenvolvimento-web-executar.component';
import { CursosPythonExecutarComponent } from './cursos-executar/cursos-python-executar/cursos-python-executar.component';

import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { CardCursosComponent } from './card-cursos/card-cursos.component';
import path from 'path';
import { Component } from '@angular/core';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { AuthGuard } from './_guard/auth.guard';


export const routes: Routes = [

  {
    path: 'profile/:id',
    loadComponent: () => import('./profile/profile.component')
      .then(m => m.ProfileComponent)
  },

  // Rotas principais
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // Rotas de autenticação
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },

  // Rotas de cursos
  { path: 'cursos', component: CursosComponent },
  { path: 'curso-desenvolvimento-web', component: CursoDesenvolvimentoWebComponent },
  { path: 'curso-desenvolvimento-app', component: CursoDesenvolvimentoAppComponent },
  { path: 'curso-python-iniciante', component: CursoPythonInicianteComponent },
  { path: 'curso-desenvolvimento-web-executar', component: CursosDesenvolvimentoWebExecutarComponent },
  { path: 'curso-python-iniciante-executar', component: CursosPythonExecutarComponent},
  // Rotas informativas
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'contato', component: ContatoComponent },
  // Rotas administrativas e utilitárias
  { path: 'certificados', component: CertificadosComponent},
  { path: 'card-cursos', component: CardCursosComponent},
  {path: 'cursos-lista', component: CursosListaComponent}

];
