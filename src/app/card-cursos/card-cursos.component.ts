import { Component, Input } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-cursos',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './card-cursos.component.html',
  styleUrl: './card-cursos.component.css'
})
export class CardCursosComponent {
  @Input() titulo: string = '';
  @Input() professor: string = '';
  @Input() imagemCurso: string = '';
  @Input() avaliacao: number = 0;
  @Input() estrelas: string[] = [];

}
