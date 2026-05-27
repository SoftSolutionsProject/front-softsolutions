import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatbotService } from '../_service/chatbot.service';
import { ChatMessage } from '../interfaces/chat-message.interface';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatBody') chatBody!: ElementRef;

  userMessage = '';
  loading = false;
  open = false;
  messages: ChatMessage[] = [];
  private readonly isBrowser: boolean;

  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadConversation();
  }

  toggleChat(): void {
    this.open = !this.open;
    if (this.open) {
      this.scrollToBottom();
    }
  }

  sendMessage(): void {
    if (!this.userMessage.trim() || this.loading) return;

    const message = this.userMessage.trim();
    this.messages.push({
      sender: 'user',
      text: message,
      timestamp: new Date(),
    });

    this.userMessage = '';
    this.loading = true;
    this.saveConversation();
    this.scrollToBottom();

    const conversationHistory = this.messages.map((item) => ({
      sender: item.sender,
      text: item.text,
    }));

    this.chatbotService.sendMessage(message, conversationHistory).subscribe({
      next: (response) => {
        this.messages.push({
          sender: 'bot',
          text: response.response ?? 'Não consegui responder no momento.',
          timestamp: new Date(),
          suggestions: response.suggestions ?? [],
          relatedCourses: response.relatedCourses ?? [],
          navigation: response.navigation ?? [],
        });

        this.loading = false;
        this.saveConversation();
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({
          sender: 'bot',
          text: 'Erro ao conectar com o servidor.',
          timestamp: new Date(),
        });

        this.loading = false;
        this.saveConversation();
        this.scrollToBottom();
      },
    });
  }

  selectSuggestion(suggestion: string): void {
    this.userMessage = suggestion;
    this.sendMessage();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  clearChat(): void {
    if (this.isBrowser) {
      localStorage.removeItem('softsolutions_chat');
    }

    this.messages = [
      {
        sender: 'bot',
        text: 'Conversa reiniciada. Como posso te ajudar agora?',
        timestamp: new Date(),
      },
    ];
  }

  private loadConversation(): void {
    if (!this.isBrowser) {
      this.messages = [
        {
          sender: 'bot',
          text: 'Olá. Sou o assistente virtual da SoftSolutions. Posso recomendar cursos, explicar tecnologias e ajudar na navegação da plataforma.',
          timestamp: new Date(),
        },
      ];
      return;
    }

    const saved = localStorage.getItem('softsolutions_chat');

    if (saved) {
      this.messages = JSON.parse(saved);
      return;
    }

    this.messages = [
      {
        sender: 'bot',
        text: 'Olá. Sou o assistente virtual da SoftSolutions. Posso recomendar cursos, explicar tecnologias e ajudar na navegação da plataforma.',
        timestamp: new Date(),
      },
    ];
  }

  private saveConversation(): void {
    if (!this.isBrowser) return;
    localStorage.setItem('softsolutions_chat', JSON.stringify(this.messages));
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatBody) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
