import { Routes } from '@angular/router';
import { Perfil } from './components/perfil/perfil';

export const routes: Routes = [
  { path: 'perfil', component: Perfil, data: { propio: true } },
  { path: 'usuarios/:id', component: Perfil, data: { propio: false } },
];
