import { Component, computed, input } from '@angular/core';
import { Articulo } from '../../../models/articulo';

@Component({
  selector: 'app-articulo-sobre',
  styleUrl: './articulo-sobre.scss',
  templateUrl: './articulo-sobre.html',
})
export class ArticuloSobre {
  readonly articulo = input.required<Articulo>();

  protected readonly detalles = computed(() => {
    const a = this.articulo();
    return [
      { etiqueta: 'Categoría', valor: a.categoria },
      { etiqueta: 'Estado', valor: a.estado },
      { etiqueta: 'Talla', valor: a.talla },
      { etiqueta: 'Publicado', valor: a.publicado },
    ];
  });
}
