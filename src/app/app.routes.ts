import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Explore } from './components/explore/explore';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'articulos', component: Explore },
];
