import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { ArticuloGaleria } from './galeria/articulo-galeria';
import { ArticuloInfo } from './info/articulo-info';
import { ArticuloSobre } from './sobre/articulo-sobre';
import { ARTICULO_MOCK } from './articulo-mock';

@Component({
  imports: [RouterLink, Navbar, ArticuloGaleria, ArticuloInfo, ArticuloSobre],
  selector: 'app-articulo-detalle',
  styleUrl: './articulo-detalle.scss',
  templateUrl: './articulo-detalle.html',
})
export class ArticuloDetalle {
  protected readonly articulo = signal(ARTICULO_MOCK);
}
