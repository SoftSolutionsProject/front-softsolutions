import { Component, OnInit, Injectable } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AutorizacaoService } from '../../_service/autorizacao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


@Injectable({
  providedIn: 'root'
})


export class LoginComponent implements OnInit{

  constructor(private autorizacaoService:AutorizacaoService) {  }

  descricaoLogin = () =>
    this.autorizacaoService.statusLogin() ? "Estou Autorizado" : "Não Autorizado";
  ngOnInit(): void {
   }

  clickLogin(){
    if (this.autorizacaoService.statusLogin()) {
      this.autorizacaoService.deslogar();
    }else{
      this.autorizacaoService.autorizar();
    }
  };

  /*
  loginAutotizado = false;

  ngOnInit(): void {
      this.statusLogin();
  }
  
  
  descricaoLogin = () => this.loginAutotizado ? "Estou Autorizado" : "Não Autorizado";
  */

  /*
  statusLogin(){
    this.loginAutotizado = !!localStorage.getItem("login");
  
  clickLogin(){
    if(this.loginAutotizado) {
      localStorage.clear();
      console.log("clear login");
    }else{
      localStorage.setItem("login", "SIM")
      console.log("logado")
      this.statusLogin();
    }
  };
  */
}


