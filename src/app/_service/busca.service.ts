import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BuscaTextoResponse, BuscaVozResponse } from './busca.types';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {
  private readonly buscaUrl = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) {}

  buscarTexto(query: string): Observable<BuscaTextoResponse> {
    return this.http.get<BuscaTextoResponse>(
      `${this.buscaUrl}/text-search?q=${encodeURIComponent(query)}`
    );
  }

  buscarPorVoz(text: string): Observable<BuscaVozResponse> {
    return this.http.post<BuscaVozResponse>(`${this.buscaUrl}/voice`, { text });
  }
}

