import { Component } from '@angular/core';
import { Brand } from '../brand/brand';

@Component({
  imports: [Brand],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {}
