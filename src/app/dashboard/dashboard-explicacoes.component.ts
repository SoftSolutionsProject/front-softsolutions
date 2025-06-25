import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-explicacoes',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDividerModule, MatIconModule],
  template: `
    <h2>ℹ️ Regras e critérios adotados</h2>
    <mat-divider></mat-divider>
    <ul>
      <li><strong>Cursos inscritos:</strong> considera apenas os cursos com inscrição ativa.</li>
      <li><strong>Certificados emitidos:</strong> inclui todos os certificados, mesmo de cursos cancelados.</li>
      <li><strong>Progresso por curso:</strong> calculado apenas para os cursos que você ainda está inscrito.</li>
      <li><strong>Tempo total de estudo:</strong> soma o tempo de todas as aulas concluídas, incluindo cursos cancelados.</li>
      <li><strong>Histórico de estudo:</strong> mostra os minutos estudados por dia com base nas aulas concluídas.</li>
      <li><strong>Cursos por categoria:</strong> considera somente os cursos com inscrição ativa.</li>
      <li><strong>Dias ativos de estudo:</strong> número total de dias em que você estudou pelo menos uma aula.</li>
      <li><strong>Dias consecutivos de estudo:</strong> maior sequência de dias seguidos com estudo registrado.</li>
      <li><strong>Sequência atual de dias com estudo:</strong> dias seguidos mais recentes com atividade registrada, sem interrupção.</li>
    </ul>
  `
})
export class DashboardExplicacoesComponent {}
