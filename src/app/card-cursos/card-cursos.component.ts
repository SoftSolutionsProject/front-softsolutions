import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-card-cursos',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './card-cursos.component.html',
  styleUrl: './card-cursos.component.css'
})
export class CardCursosComponent {
  @Input() titulo: string = '';
  @Input() professor: string = '';
  @Input() imagemCurso: string = '';
  @Input() avaliacao: number = 0;
  @Input() estrelas: string[] = [];
  @Input() id: number = 0;
}