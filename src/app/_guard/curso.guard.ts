import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BService } from '../_service/bservice.service';

@Injectable({
  providedIn: 'root',
})
export class CourseGuard implements CanActivate {
  private platformId = inject(PLATFORM_ID);

  constructor(private bservice: BService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return true; // Allow SSR to proceed
    }

    const cursoId = Number(route.params['id']);
    const userId = localStorage.getItem('_idUser');

    if (!userId || !cursoId) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      const inscricoes = await this.bservice.listarInscricoesUsuario().toPromise();

      const temInscricaoAtiva = Array.isArray(inscricoes) && inscricoes.some(
        (i: any) => i.curso?.id === cursoId && i.status === 'ativo'
      );


      if (!temInscricaoAtiva) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Erro ao verificar inscrição:', err);
      this.router.navigate(['/']);
      return false;
    }
  }
}
