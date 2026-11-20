import { Component, computed, input, signal } from '@angular/core';

const MAX_MINIATURAS = 4;

@Component({
  selector: 'app-articulo-galeria',
  styleUrl: './articulo-galeria.scss',
  templateUrl: './articulo-galeria.html',
})
export class ArticuloGaleria {
  readonly imagenes = input.required<string[]>();
  readonly titulo = input.required<string>();

  protected readonly seleccionada = signal(0);
  protected readonly favorito = signal(false);

  protected readonly imagenActual = computed(() => this.imagenes()[this.seleccionada()]);
  protected readonly miniaturas = computed(() => this.imagenes().slice(0, MAX_MINIATURAS));
  /** Imágenes que no caben en la columna de miniaturas (se muestran como "+N"). */
  protected readonly restantes = computed(() =>
    Math.max(0, this.imagenes().length - MAX_MINIATURAS),
  );

  protected seleccionar(indice: number): void {
    this.seleccionada.set(indice);
  }

  protected alternarFavorito(): void {
    this.favorito.update((valor) => !valor);
  }
}
