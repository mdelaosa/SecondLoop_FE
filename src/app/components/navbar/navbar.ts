import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  @Input() userRole: 'guest' | 'user' | 'moderator' | 'admin' = 'guest';
}
