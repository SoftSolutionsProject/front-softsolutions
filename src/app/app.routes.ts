import { Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
import { CourseGuard } from './_guard/curso.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./cadastro/cadastro.component').then(m => m.CadastroComponent)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./recuperar-senha/recuperar-senha.component').then(m => m.RecuperarSenhaComponent)
  },
  {
    path: 'quem-somos',
    loadComponent: () =>
      import('./quem-somos/quem-somos.component').then(m => m.QuemSomosComponent)
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./contato/contato.component').then(m => m.ContatoComponent)
  },
  {
    path: 'certificados',
    loadComponent: () =>
      import('./certificados/certificados.component').then(m => m.CertificadosComponent)
  },
  {
    path: 'card-cursos',
    loadComponent: () =>
      import('./card-cursos/card-cursos.component').then(m => m.CardCursosComponent)
  },
  {
    path: 'cursos-lista',
    loadComponent: () =>
      import('./cursos-lista/cursos-lista.component').then(m => m.CursosListaComponent)
  },
  {
    path: 'curso/:id',
    loadComponent: () =>
      import('./detalhes-curso/detalhes-curso.component').then(m => m.DetalhesCursoComponent)
  },
  {
    path: 'curso/:id/aulas',
    canActivate: [CourseGuard],
    loadComponent: () =>
      import('./aulas-curso/aulas-curso.component').then(m => m.AulasCursoComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'busca-semantica',
    loadComponent: () =>
      import('./busca-semantica/busca-semantica.component').then(m => m.BuscaSemanticaComponent)
  }
];