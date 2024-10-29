//app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CursosComponent } from './cursos/cursos.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TabelaComponent } from './tabela/tabela.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { CursoDesenvolvimentoWebComponent } from './curso-desenvolvimento-web/curso-desenvolvimento-web.component';
import { ContatoComponent } from './contato/contato.component';
import { CursoDesenvolvimentoAppComponent } from './curso-desenvolvimento-app/curso-desenvolvimento-app.component';
import { CursoPythonInicianteComponent } from './curso-python-iniciante/curso-python-iniciante.component';
import { CursosDesenvolvimentoWebExecutarComponent } from './cursos-executar/cursos-desenvolvimento-web-executar/cursos-desenvolvimento-web-executar.component';
import { CursosPythonExecutarComponent } from './cursos-executar/cursos-python-executar/cursos-python-executar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';


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
  // Rotas protegidas
  { path: 'categoria', component: CategoriaComponent},
  // Rotas de perfil e usuário
  { path: 'perfil', component: PerfilComponent},

  // Rotas de cursos
  { path: 'cursos', component: CursosComponent },
  { path: 'curso-desenvolvimento-web', component: CursoDesenvolvimentoWebComponent },
  { path: 'curso-desenvolvimento-app', component: CursoDesenvolvimentoAppComponent },
  { path: 'curso-python-iniciante', component: CursoPythonInicianteComponent },
  { path: 'curso-desenvolvimento-web-executar', component: CursosDesenvolvimentoWebExecutarComponent },
  { path: 'curso-python-iniciante-executar', component: CursosPythonExecutarComponent},
  // Rotas informativas
  { path: 'about', component: AboutComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'contato', component: ContatoComponent },
  // Rotas administrativas e utilitárias
  { path: 'tabela', component: TabelaComponent },
  { path: 'certificados', component: CertificadosComponent},
];
