import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.css'
})
export class TesteComponent {

}
