import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BuscaTextoResponse, BuscaVozResponse } from './busca.types';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {
  private readonly apiUrl = environment.apiUrl;
  private readonly buscaUrl = `${this.apiUrl}/search`;

  constructor(private http: HttpClient) {}

  buscarTexto(query: string): Observable<BuscaTextoResponse> {
    const url = `${this.buscaUrl}/text-search?q=${encodeURIComponent(query)}`;
    console.log('GET', url);
    return this.http.get<BuscaTextoResponse>(url);
  }

  buscarPorVoz(text: string): Observable<BuscaVozResponse> {
    const url = `${this.buscaUrl}/voice`;
    console.log('POST', url, { text });
    return this.http.post<BuscaVozResponse>(url, { text });
  }
}