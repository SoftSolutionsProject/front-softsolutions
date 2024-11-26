import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curso {
  _idCurso: number;
  nomeCurso: string;
  professor: string;
  imagemCurso: string;
  avaliacao: number;
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API_URL = 'https://softsolutions.onrender.com/api/cursos';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API_URL);
  }
}
