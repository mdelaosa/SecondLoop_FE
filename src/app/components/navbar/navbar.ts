import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rol } from '../../models/rol';
import { Brand } from '../brand/brand';

@Component({
  imports: [Brand, RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly userRole = input<Rol | null>(null);
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    // Implementar lógica de cierre de sesión aquí
    this.closeMenu();
  }
}
