import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  menuActive = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token; // Retorna true se o token existir
    }
    return false; // Retorna false em ambientes que não suportam localStorage
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('_idUser');
    this.router.navigate(['/login']);
  }

  getUserId(): string | null {
    return localStorage.getItem('_idUser');
  }

}
