import { Component } from '@angular/core';
import { CursosPythonExecutarComponent } from './cursos-executar/cursos-python-executar/cursos-python-executar.component';
import { CursoPythonInicianteComponent } from './curso-python-iniciante/curso-python-iniciante.component';
import {  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { autorizacaoGuard } from './_guard/autorizacao.guard';
import { CursosComponent } from './cursos/cursos.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TabelaComponent } from './tabela/tabela.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { CursoDesenvolvimentoWebComponent } from './curso-desenvolvimento-web/curso-desenvolvimento-web.component';
import { ContatoComponent } from './contato/contato.component';
import { CursoDesenvolvimentoAppComponent } from './curso-desenvolvimento-app/curso-desenvolvimento-app.component';
import { CursosDesenvolvimentoWebExecutarComponent } from './cursos-executar/cursos-desenvolvimento-web-executar/cursos-desenvolvimento-web-executar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'about', component: AboutComponent},
    { path: 'cursos', component: CursosComponent},
    { path: 'categoria', component: CategoriaComponent, canActivate: [autorizacaoGuard] },
    { path: 'quem-somos', component: QuemSomosComponent},
    { path: 'cadastro', component: CadastroComponent},
    { path: 'tabela', component: TabelaComponent},
    { path: 'cadastro', component: CadastroComponent},
    { path: 'certificados', component: CertificadosComponent},
    { path: 'curso-desenvolvimento-web', component: CursoDesenvolvimentoWebComponent},
    { path: 'contato', component: ContatoComponent},
    { path: 'curso-desenvolvimento-app', component: CursoDesenvolvimentoAppComponent},
    { path: 'curso-python-iniciante', component: CursoPythonInicianteComponent},
    { path: 'curso-desenvolvimento-web-executar', component: CursosDesenvolvimentoWebExecutarComponent},
    { path: 'curso-python-iniciante-executar', component:CursosPythonExecutarComponent},
    { path: 'perfil', component:PerfilComponent},
    { path: 'recuperar-senha', component: RecuperarSenhaComponent},

];

