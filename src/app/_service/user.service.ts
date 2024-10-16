// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuario(idUser: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idUser}`);
  }

  atualizarUsuario(idUser: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${idUser}`, usuario);
  }
}
