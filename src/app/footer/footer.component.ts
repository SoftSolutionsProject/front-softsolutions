import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
 
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
    public copyright = '© 2023 Todos Os Direitos Reservados | SoftSolutions';
}
 