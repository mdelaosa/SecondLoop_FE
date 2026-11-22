import { Component } from '@angular/core';
import { Brand } from '../brand/brand';

@Component({
  imports: [Brand],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  userRole: 'guest' | 'user' | 'moderator' | 'admin' = 'guest';
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
