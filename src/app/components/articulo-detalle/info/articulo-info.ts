import { Component, computed, input } from '@angular/core';
import { Articulo } from '../../../models/articulo';

const formatoPrecio = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatoValoracion = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

@Component({
  selector: 'app-articulo-info',
  styleUrl: './articulo-info.scss',
  templateUrl: './articulo-info.html',
})
export class ArticuloInfo {
  readonly articulo = input.required<Articulo>();

  protected readonly precio = computed(() => formatoPrecio.format(this.articulo().precio));
  protected readonly valoracion = computed(() =>
    formatoValoracion.format(this.articulo().vendedor.valoracion),
  );
}
