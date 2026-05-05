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

  cursos: any[] = [];

  constructor(private bservice: BService) {}

  ngOnInit(): void {
    this.bservice.listarCursos().subscribe({
      next: (data) => {
        this.cursos = data.map(curso => ({
          titulo: curso.nomeCurso,
          professor: curso.professor,
          imagemCurso: curso.imagemCurso,
          avaliacao: curso.avaliacao,
          estrelas: Array(Math.round(curso.avaliacao || 0)).fill('assets/images/home/estrela.png'),
          id: curso.id
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar cursos:', err);
      }
    });
  }
}
