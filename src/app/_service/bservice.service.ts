import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BService {
  private readonly API_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Erro BService:', error);
    return throwError(() => error);
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };
  }

  // ---------- AUTENTICAÇÃO ----------

  login(email: string, senha: string): Observable<{ usuario: any; access_token: string }> {
  return this.http.post<{ usuario: any; access_token: string }>(`${this.API_URL}/usuarios/login`, { email, senha }).pipe(
    tap((res) => {
      localStorage.setItem('token', res.access_token); // Corrigido
      localStorage.setItem('_idUser', res.usuario.id.toString());
      localStorage.setItem('tipoUser', res.usuario.tipo);
    }),
    catchError(this.handleError)
  );
}

  cadastrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/usuarios/cadastro`, data).pipe(
      tap(() => console.log('Usuário cadastrado com sucesso')),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('_idUser');
    localStorage.removeItem('tipoUser');
  }

  // ---------- PERFIL ----------

  getProfile(userId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/usuarios/${userId}`, this.getAuthHeaders()).pipe(catchError(this.handleError));
  }

  updateProfile(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/usuarios/${userId}`, userData, this.getAuthHeaders()).pipe(
      tap(() => console.log('Perfil atualizado com sucesso')),
      catchError(this.handleError)
    );
  }

  // ---------- CURSOS ----------

  listarCursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/cursos`).pipe(catchError(this.handleError));
  }

  obterCurso(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/cursos/${id}`).pipe(catchError(this.handleError));
  }

  obterAulasCurso(idCurso: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/cursos/${idCurso}/aulas`).pipe(catchError(this.handleError));
  }

  // ---------- INSCRIÇÕES ----------

  listarInscricoesUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/inscricoes/usuario`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  inscreverUsuario(idCurso: number): Observable<any> {
    return this.http.post(`${this.API_URL}/inscricoes/cursos/${idCurso}`, {}, this.getAuthHeaders()).pipe(
      tap(() => console.log('Inscrição realizada com sucesso')),
      catchError(this.handleError)
    );
  }

  cancelarInscricao(idInscricao: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/inscricoes/${idInscricao}/cancelar`, this.getAuthHeaders()).pipe(
      tap(() => console.log('Inscrição cancelada')),
      catchError(this.handleError)
    );
  }

  concluirAula(idInscricao: number, idAula: number): Observable<any> {
    return this.http.post(
      `${this.API_URL}/inscricoes/${idInscricao}/concluir-aula/${idAula}`,
      {},
      this.getAuthHeaders()
    ).pipe(
      tap(() => console.log('Aula concluída')),
      catchError(this.handleError)
    );
  }

  // ---------- SUPORTE / EMAIL ----------

  enviarEmailSuporte(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/email/suporte`, dados).pipe(
      tap(() => console.log('Email de suporte enviado')),
      catchError(this.handleError)
    );
  }

  // ---------- PROGRESSO ----------
  mapearInscricoes(inscricoes: any[]): any[] {
    return inscricoes.map(insc => {
      let statusInscricao = 0;
      const progresso = insc.progressoAulas || [];

      if (progresso.some((p: any) => p.concluida === true)) {
        statusInscricao = 1;
      }
      if (progresso.every((p: any) => p.concluida === true) && progresso.length > 0) {
        statusInscricao = 2;
      }

      return {
        id: insc.id,
        curso: insc.curso,
        statusInscricao,
      };
    });
  }


  listarModulosEAulasDoCurso(idCurso: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/cursos/${idCurso}/aulas`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

desmarcarAula(idInscricao: number, idAula: number): Observable<any> {
  return this.http.post(
    `${this.API_URL}/inscricoes/${idInscricao}/desmarcar-aula/${idAula}`,
    {},
    this.getAuthHeaders()
  ).pipe(
    tap(() => console.log('Aula desmarcada como concluída')),
    catchError(this.handleError)
  );
}

obterProgresso(idInscricao: number): Observable<any> {
  return this.http.get(`${this.API_URL}/inscricoes/${idInscricao}/progresso`, this.getAuthHeaders()).pipe(
    catchError(this.handleError)
  );
}

}
