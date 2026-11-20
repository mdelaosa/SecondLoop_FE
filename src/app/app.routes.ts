import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ArticuloDetalle } from './components/articulo-detalle/articulo-detalle';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'articulo/:id', component: ArticuloDetalle },
];
