import { Component, Input } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { CardCursosComponent } from "../card-cursos/card-cursos.component";

@Component({
  selector: 'app-cursos-lista',
  standalone: true,
  imports: [CommonModule, MaterialModule, CardCursosComponent],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css'
})
export class CursosListaComponent {

  cursos = [
    {
      titulo: 'Python para Iniciantes',
      professor: 'Prof. Júlio Santos',
      imagemCurso: 'assets/images/cursos/python.png',
      avaliacao: 4.9,
      estrelas: Array(4).fill('assets/images/home/estrela.png')  // Array para 5 estrelas
    },
    {
      titulo: 'Desenvolvimento Web',
      professor: 'Prof. Paulo Sérgio Coelho',
      imagemCurso: 'assets/images/cursos/desenvolvimento-web.jpg',
      avaliacao: 5.0,
      estrelas: Array(5).fill('assets/images/home/estrela.png')
    },
    {
      titulo: 'Desenvolvimento de Apps',
      professor: 'Prof. Marcos Andrade',
      imagemCurso: 'assets/images/cursos/desenvolvimento-apps.jpg',
      avaliacao: 5.0,
      estrelas: Array(5).fill('assets/images/home/estrela.png')
    },
    {
      titulo: 'PHP',
      professor: 'Prof. Simas S. Filho',
      imagemCurso: 'assets/images/cursos/php.png',
      avaliacao: 5.0,
      estrelas: Array(5).fill('assets/images/home/estrela.png')
    },
    {
      titulo: 'Usabilidade e UX',
      professor: 'Prof. Sandra S. Lima',
      imagemCurso: 'assets/images/cursos/usabilidade.jpg',
      avaliacao: 5.0,
      estrelas: Array(5).fill('assets/images/home/estrela.png')
    },
    {
      titulo: 'React Native',
      professor: 'Prof. Júlio Santos',
      imagemCurso: 'assets/images/cursos/react.png',
      avaliacao: 5.0,
      estrelas: Array(4).fill('assets/images/home/estrela.png')
    }
  ];

}
