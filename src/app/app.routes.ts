import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { ContatoComponent } from './contato/contato.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { CardCursosComponent } from './card-cursos/card-cursos.component';
import path from 'path';
import { Component } from '@angular/core';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { AuthGuard } from './_guard/auth.guard';
import { DetalhesCursoComponent } from './detalhes-curso/detalhes-curso.component';
import { AulasCursoComponent } from './aulas-curso/aulas-curso.component';
import { CourseGuard } from './_guard/curso.guard';

export const routes: Routes = [

  {
    path: 'profile/:id',
    loadComponent: () => import('./profile/profile.component')
      .then(m => m.ProfileComponent)
  },
  { path: 'curso/:id', component: DetalhesCursoComponent },
  { path: 'curso/:id/aulas', component: AulasCursoComponent, canActivate: [CourseGuard],},

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'certificados', component: CertificadosComponent},
  { path: 'card-cursos', component: CardCursosComponent},
  {path: 'cursos-lista', component: CursosListaComponent}

];
