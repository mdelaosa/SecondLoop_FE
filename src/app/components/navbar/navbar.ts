import { Component, Input } from '@angular/core';
import { Brand } from '../brand/brand';

@Component({
  imports: [Brand],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  @Input() userRole: 'guest' | 'user' | 'moderator' | 'admin' = 'guest';
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    // Cuando haya un sistema de autenticación, se implementará la lógica de cierre de sesión aquí.
    this.userRole = 'guest';
    this.menuOpen = false;
  }
}
