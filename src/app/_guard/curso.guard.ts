import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CursosService } from '../_service/cursos.service';
import { UserService } from '../_service/user.service';

@Injectable({
  providedIn: 'root',
})
export class CourseGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const cursoId = route.params['id'];
    const userId = localStorage.getItem('_idUser');

    if (!userId || !cursoId) {
      this.router.navigate(['/']);
      return Promise.resolve(false);
    }

    return this.userService.getInscricoes(parseInt(userId)).toPromise().then((inscricoes) => {
      if (!inscricoes || inscricoes.length === 0) {
        this.router.navigate(['/']);
        return false;
      }

      const inscrito = inscricoes.some((i) => i._idCurso === parseInt(cursoId));
      if (!inscrito) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }).catch(() => {
      // Caso ocorra algum erro na API
      this.router.navigate(['/']);
      return false;
    });
  }
}
