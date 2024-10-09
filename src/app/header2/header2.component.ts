import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
