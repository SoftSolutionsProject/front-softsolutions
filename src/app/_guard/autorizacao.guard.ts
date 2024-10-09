import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutorizacaoService } from '../_service/autorizacao.service';


export const autorizacaoGuard = () => {
    const autorizaService = inject(AutorizacaoService);
    const router = inject(Router);

  if (autorizaService.statusLogin()) {
      autorizaService.autorizar();
      return true;
  }else{
      autorizaService.deslogar();
      router.navigate(['/home']);
      return false;
  }
};
