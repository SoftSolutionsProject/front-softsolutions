import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutorizacaoService {

  autorizado = false;

  constructor() { }

  autorizar(){
    localStorage.setItem("login","SIM");
    }

  deslogar(){
    localStorage.clear();
  }

  statusLogin(){
    return !!localStorage.getItem("login");
  }
}
