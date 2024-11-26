import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { CardCursosComponent } from "../card-cursos/card-cursos.component";
import { CursosService } from '../_service/cursos.service';

@Component({
  selector: 'app-cursos-lista',
  standalone: true,
  imports: [CommonModule, MaterialModule, CardCursosComponent],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css'
})
export class CursosListaComponent implements OnInit {

  cursos: any[] = []; // Inicialize como um array vazio

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data.map(curso => ({
          titulo: curso.nomeCurso,
          professor: curso.professor,
          imagemCurso: curso.imagemCurso,
          avaliacao: curso.avaliacao,
          estrelas: Array(Math.round(curso.avaliacao)).fill('assets/images/home/estrela.png'),
          id: curso._idCurso
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar cursos:', err);
      }
    });
  }
}
