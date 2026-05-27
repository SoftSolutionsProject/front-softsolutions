import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly apiUrl = `${environment.apiUrl}/chatbot`;

  constructor(private http: HttpClient) {}

  sendMessage(
    message: string,
    conversationHistory: Array<{ sender: string; text: string }>
  ): Observable<any> {
    const history = conversationHistory.map((item) => ({
      role: item.sender === 'user' ? 'user' : 'assistant',
      content: item.text,
    }));

    return this.http.post(this.apiUrl, { message, history });
  }
}
