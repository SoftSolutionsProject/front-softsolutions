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
  _idCurso: number; // ID do curso
  statusInscricao: number; // Status da inscrição
  dataInscricao: Date; // Data de inscrição
  nomeCurso?: string; // Nome do curso
  imagemCurso?: string; // Adiciona a propriedade imagemCurso
  modulos?: {
    _idModulo: number;
    nomeModulo: string;
    status?: number; // Status do módulo (opcional)
  }[];
  progresso?: Progresso[]; // Adicionado o campo progresso
}

interface Progresso {
  _idModulo: number;
  status: number;
  aulasConcluidas: any[]; // Ajuste conforme necessário
}

interface Curso {
  _idCurso: number;
  nomeCurso: string;
  tempoCurso: string;
  imagemCurso: string;
  modulos: {
    _idModulo: number;
    nomeModulo: string;
    _idConclusao?: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://soft-solutions-chi.vercel.app/api';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Algo deu errado. Por favor, tente novamente mais tarde.'));
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getProfile(userId: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${this.apiUrl}/usuarios/${userId}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  updateProfile(userId: number, userData: Partial<Usuario>): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.apiUrl}/usuarios/${userId}`, userData, this.getAuthHeaders())
      .pipe(
        tap(() => console.log('Perfil atualizado com sucesso')),
        catchError(this.handleError)
      );
  }

  getInscricoes(userId: number): Observable<Inscricao[]> {
    return this.http
      .get<Inscricao[]>(`${this.apiUrl}/inscricoes/${userId}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/cursos`).pipe(catchError(this.handleError));
  }

  getInscricoesWithCourseInfo(userId: number): Observable<Inscricao[]> {
    return forkJoin({
      inscricoes: this.getInscricoes(userId),
      cursos: this.getCursos(),
    }).pipe(
      map(({ inscricoes, cursos }) => {
        return inscricoes.map((inscricao) => {
          const curso = cursos.find((c) => c._idCurso === inscricao._idCurso);

          // Calcular o status geral com base no progresso dos módulos
          const progresso: Progresso[] = inscricao.progresso || [];
          let statusInscricao = 0; // Default: Não iniciado

          if (progresso.some((modulo: Progresso) => modulo.status === 1)) {
            statusInscricao = 1; // Em andamento
          }
          if (progresso.every((modulo: Progresso) => modulo.status === 2)) {
            statusInscricao = 2; // Concluído
          }

          return {
            ...inscricao,
            nomeCurso: curso?.nomeCurso,
            imagemCurso: curso?.imagemCurso,
            statusInscricao, // Define o status geral da inscrição
            modulos: curso?.modulos || [],
          };
        });
      })
    );
  }

  cancelarInscricao(userId: number, cursoId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/inscricoes/${userId}/cursos/${cursoId}`, this.getAuthHeaders())
      .pipe(
        tap(() => console.log('Inscrição cancelada com sucesso')),
        catchError(this.handleError)
      );
  }

  login(email: string, senha: string): Observable<{ user: { _idUser: number }; token: string }> {
    return this.http
      .post<{ user: { _idUser: number }; token: string }>(
        `${this.apiUrl}/usuarios/login`,
        { email, senha }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token); // Armazena o token no localStorage
          localStorage.setItem('_idUser', response.user._idUser.toString()); // Armazena o ID do usuário
          console.log('Login realizado com sucesso:', response);
        }),
        catchError((error) => {
          console.error('Erro no login:', error);
          return throwError(() => new Error('Login ou senha inválidos.'));
        })
      );
  }

  logout() {
    localStorage.removeItem('token'); // Remove o token ao sair
    console.log('Usuário deslogado');
  }

  cadastrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/cadastro`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao cadastrar usuário:', error);
        return throwError(() => error); // Retorna o erro completo para o componente
      })
    );
  }

  inscreverCurso(idCurso: number, idUser: number): Observable<any> {
    const body = {
      _idCurso: idCurso,
      _idUser: idUser,
    };

    return this.http.post(`${this.apiUrl}/inscricoes`, body, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao inscrever no curso:', error);
        return throwError(() => new Error('Erro ao se inscrever no curso. Por favor, tente novamente.'));
      })
    );
  }

  updateAulaProgresso(
    userId: number,
    cursoId: number,
    moduloId: number,
    aulaId: number,
    concluida: boolean
  ): Observable<any> {
    const body = { userId, cursoId, moduloId, aulaId, concluida };
    return this.http.put(`${this.apiUrl}/inscricoes/progresso`, body, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao atualizar progresso:', error);
        return throwError(() => new Error('Erro ao atualizar progresso.'));
      })
    );
  }





}

