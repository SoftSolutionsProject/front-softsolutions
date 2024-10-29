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
  private apiUrl = 'https://softsolutions.onrender.com/api';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Algo deu errado. Por favor, tente novamente mais tarde.'));
  }

  getProfile(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(userId: number, userData: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${userId}`, userData).pipe(
      tap(() => console.log('Perfil atualizado com sucesso')),
      catchError(this.handleError)
    );
  }

  getInscricoes(userId: number): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`${this.apiUrl}/inscricoes/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log('Nenhuma inscrição encontrada para este usuário.');
          return [];
        } else {
          return this.handleError(error);
        }
      })
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
    return this.http.delete(`${this.apiUrl}/inscricoes/${userId}/cursos/${moduleId}`).pipe(
      tap(() => console.log('Inscrição cancelada com sucesso')),
      catchError(this.handleError)
    );
  }
}
