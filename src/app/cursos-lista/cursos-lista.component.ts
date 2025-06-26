import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { CardCursosComponent } from '../card-cursos/card-cursos.component';
import { BService } from '../_service/bservice.service';

@Component({
  selector: 'app-cursos-lista',
  standalone: true,
  imports: [CommonModule, MaterialModule, CardCursosComponent],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css'
})
export class CursosListaComponent implements OnInit {
  todosCursos: any[] = [];
  cursos: any[] = [];

  paginaAtual = 1;
  tamanhoPagina = 8;
  totalPaginas = 0;

  constructor(private bservice: BService) {}

  ngOnInit(): void {
    this.bservice.listarCursos().subscribe({
      next: (data) => {
        this.todosCursos = data.map(curso => ({
          titulo: curso.nomeCurso,
          professor: curso.professor,
          imagemCurso: curso.imagemCurso,
          avaliacao: curso.avaliacao,
          estrelas: Array(Math.round(curso.avaliacao || 0)).fill('assets/images/home/estrela.png'),
          id: curso.id
        }));

        this.totalPaginas = Math.ceil(this.todosCursos.length / this.tamanhoPagina);
        this.atualizarCursos();
      },
      error: (err) => {
        console.error('Erro ao buscar cursos:', err);
      }
    });
  }

  atualizarCursos(): void {
    const inicio = (this.paginaAtual - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;
    this.cursos = this.todosCursos.slice(inicio, fim);
  }

  mudarPagina(delta: number): void {
    const novaPagina = this.paginaAtual + delta;
    if (novaPagina >= 1 && novaPagina <= this.totalPaginas) {
      this.paginaAtual = novaPagina;
      this.atualizarCursos();
    }
  }
}
