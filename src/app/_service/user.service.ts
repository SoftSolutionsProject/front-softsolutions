import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

export interface Usuario {
  _idUser: number;
  tipo: 'administrador' | 'aluno';
  nomeUsuario: string;
  cpfUsuario: number;
  email: string;
  telefone?: string;
  endereco?: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
  };
}

export interface Inscricao {
  _idModulo: number;
  statusInscricao: number;
  dataInscricao: Date;
  nomeCurso?: string;
  nomeModulo?: string;
}

interface Curso {
  _idCurso: number;
  nomeCurso: string;
  tempoCurso: string;
  modulos: {
    _idModulo: number;
    nomeModulo: string;
    _idConclusao: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Algo deu errado. Por favor, tente novamente mais tarde.'));
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  getProfile(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${userId}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(userId: number, userData: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${userId}`, userData, this.getAuthHeaders()).pipe(
      tap(() => console.log('Perfil atualizado com sucesso')),
      catchError(this.handleError)
    );
  }

  getInscricoes(userId: number): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`${this.apiUrl}/inscricoes/${userId}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/cursos`).pipe(
      catchError(this.handleError)
    );
  }

  getInscricoesWithCourseInfo(userId: number): Observable<Inscricao[]> {
    return forkJoin({
      inscricoes: this.getInscricoes(userId),
      cursos: this.getCursos()
    }).pipe(
      map(({ inscricoes, cursos }) => {
        return inscricoes.map(inscricao => {
          const curso = cursos.find(c => c.modulos.some(m => m._idModulo === inscricao._idModulo));
          const modulo = curso?.modulos.find(m => m._idModulo === inscricao._idModulo);
          return {
            ...inscricao,
            nomeCurso: curso?.nomeCurso,
            nomeModulo: modulo?.nomeModulo
          };
        });
      })
    );
  }

  inscreverCurso(userId: number, moduleId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/inscricoes`, {
      _idUser: userId,
      _idModulo: moduleId
    }).pipe(
      tap(() => console.log('Inscrito no curso com sucesso')),
      catchError(this.handleError)
    );
  }

  cancelarInscricao(userId: number, moduleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inscricoes/${userId}/cursos/${moduleId}`, this.getAuthHeaders()).pipe(
      tap(() => console.log('Inscrição cancelada com sucesso')),
      catchError(this.handleError)
    );
  }

  login(email: string, senha: string): Observable<{ user: { _idUser: number }; token: string }> {
    return this.http.post<{ user: { _idUser: number }; token: string }>(`${this.apiUrl}/usuarios/login`, { email, senha }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Armazena o token no localStorage
        localStorage.setItem('_idUser', response.user._idUser.toString()); // Armazena o ID do usuário
        console.log('Login realizado com sucesso:', response);
      }),
      catchError(error => {
        console.error('Erro no login:', error);
        return throwError(() => new Error('Login ou senha inválidos.'));
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); // Remove o token ao sair
    console.log('Usuário deslogado');
  }
}
