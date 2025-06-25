import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardResponse } from './dashboard.model';
import { BService } from '../_service/bservice.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // ✅ Dialog
import { DashboardExplicacoesComponent } from './dashboard-explicacoes.component'; // ✅ Explicações

import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexLegend
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    NgApexchartsModule,
    MatDialogModule // ✅ Dialog importado
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData!: DashboardResponse;
  carregando = true;
  erro = false;

  // 📊 Gráfico de progresso por curso
  seriesProgresso!: ApexAxisChartSeries;
  chartProgresso!: ApexChart;
  xaxisProgresso!: ApexXAxis;
  plotOptionsProgresso!: ApexPlotOptions;
  titleProgresso!: ApexTitleSubtitle;

  // 📈 Gráfico de histórico de estudo (linha)
  seriesEstudo!: ApexAxisChartSeries;
  chartEstudo!: ApexChart;
  xaxisEstudo!: ApexXAxis;
  titleEstudo!: ApexTitleSubtitle;

  // 📊 Gráfico de cursos por categoria
  seriesCategoria!: number[];
  labelsCategoria!: string[];
  chartCategoria!: ApexChart;
  titleCategoria!: ApexTitleSubtitle;

  constructor(private bService: BService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const idLocal = localStorage.getItem('_idUser');
    const usuarioId = idLocal ? Number(idLocal) : null;

    if (usuarioId) {
      this.bService.getDashboard(usuarioId).subscribe({
        next: (data) => {
          this.dashboardData = data;
          this.carregando = false;

          // Progresso
          this.seriesProgresso = [{
            name: 'Progresso (%)',
            data: data.progressoPorCurso.map(p => p.percentualConcluido)
          }];
          this.chartProgresso = { type: 'bar', height: 350 };
          this.plotOptionsProgresso = { bar: { horizontal: true } };
          this.xaxisProgresso = {
            categories: data.progressoPorCurso.map(p => p.nomeCurso)
          };
          this.titleProgresso = { text: 'Progresso por Curso' };

          // Histórico de estudo
          this.seriesEstudo = [{
            name: 'Minutos Estudados',
            data: data.historicoEstudo.map(item => item.minutosEstudados)
          }];
          this.chartEstudo = { type: 'line', height: 350 };
          this.xaxisEstudo = {
            categories: data.historicoEstudo.map(item =>
              new Date(item.data).toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit'
              })
            )
          };
          this.titleEstudo = { text: 'Histórico de Estudo (min/dia)' };

          // Cursos por categoria
          this.seriesCategoria = data.cursosPorCategoria.map(c => c.total);
          this.labelsCategoria = data.cursosPorCategoria.map(c => c.categoria);
          this.chartCategoria = { type: 'donut', width: 380 };
          this.titleCategoria = { text: 'Cursos por Categoria' };
        },
        error: (err) => {
          console.error('Erro ao carregar dashboard:', err);
          this.erro = true;
          this.carregando = false;
        }
      });
    } else {
      console.error('ID de usuário não encontrado no localStorage.');
      this.erro = true;
      this.carregando = false;
    }
  }

  // ✅ Método que abre a explicação
  abrirExplicacoes(): void {
    this.dialog.open(DashboardExplicacoesComponent, {
      width: '500px'
    });
  }
}
