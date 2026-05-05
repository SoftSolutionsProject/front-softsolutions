import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_DATA = [
    { position: 1, email: 'lucas@softsolutions.com', senha: '1234', nome: 'Lucas', telefone: '1234-5678' },
    { position: 2, email: 'rafael@softsolutions.com', senha: '1234', nome: 'Rafael', telefone: '2345-6789' },
    { position: 3, email: 'caio@softsolutions.com', senha: '1234', nome: 'Caio', telefone: '3456-7890' },
  ];

  constructor() { }

  getUserData() {
    return this.USER_DATA;
  }

  validateUser(email: string, senha: string) {
    return this.USER_DATA.find(user => user.email === email && user.senha === senha);
  }

  addUser(email: string, senha: string, nome: string, telefone: string): string {
    if (this.USER_DATA.some(user => user.email === email)) {
      return 'O e-mail informado já possui cadastro';
    }
    const newUser = {
      position: this.USER_DATA.length + 1,
      email,
      senha,
      nome,
      telefone
    };
    this.USER_DATA.push(newUser);
    return 'Usuário cadastrado com sucesso';
  }
}
