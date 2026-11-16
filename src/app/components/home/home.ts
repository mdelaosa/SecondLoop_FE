import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  imports: [Navbar],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
