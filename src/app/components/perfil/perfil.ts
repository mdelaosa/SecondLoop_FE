import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { Articulo, EstadoArticulo, Genero, Usuario, UsuarioPropio, Valoracion } from './perfil.models';
import { PerfilService } from './perfil.service';

type Pestana = 'armario' | 'valoraciones';

const ETIQUETA_ESTADO: Record<EstadoArticulo, string> = {
  BORRADOR: 'Borrador',
  PUBLICADO: 'Publicado',
  EN_REVISION: 'En revisión',
  RETIRADO: 'Retirado',
  VENDIDO: 'Vendido',
};

const ETIQUETA_GENERO: Record<Genero, string> = { H: 'Hombre', M: 'Mujer', UNISEX: 'Unisex' };

interface DatosPerfil {
  usuario: Usuario;
  articulos: Articulo[];
  valoraciones: Valoracion[];
}

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  private readonly route = inject(ActivatedRoute);
  private readonly perfilService = inject(PerfilService);

  /** true en /perfil, false en /usuarios/:id (definido en app.routes.ts). */
  readonly esPropio = this.route.snapshot.data['propio'] === true;

  readonly pestana = signal<Pestana>('armario');

  private readonly datos = toSignal(
    this.esPropio
      ? this.perfilService
          .getPerfilPropio()
          .pipe(switchMap((usuario) => this.cargar(usuario, this.perfilService.getMisArticulos())))
      : this.route.paramMap.pipe(
          map((params) => Number(params.get('id'))),
          switchMap((id) =>
            this.perfilService
              .getUsuario(id)
              .pipe(switchMap((usuario) => this.cargar(usuario, this.perfilService.getArticulosPublicados(id)))),
          ),
        ),
  );

  readonly usuario = computed(() => this.datos()?.usuario);
  readonly articulos = computed(() => this.datos()?.articulos ?? []);
  readonly valoraciones = computed(() => this.datos()?.valoraciones ?? []);

  /** Solo existe en el perfil propio; nunca se pide en el público. */
  readonly usuarioPropio = computed(() =>
    this.esPropio ? (this.usuario() as UsuarioPropio | undefined) : undefined,
  );

  readonly nombreCorto = computed(() => {
    const u = this.usuario();
    if (!u) return '';
    return this.usuarioPropio()?.nombre ?? u.username.split(' ')[0];
  });

  /** Reparto de puntuaciones 5→1 para el resumen. */
  readonly resumen = computed(() => {
    const vals = this.valoraciones();
    const total = vals.length || 1;
    return [5, 4, 3, 2, 1].map((estrellas) => {
      const cantidad = vals.filter((v) => v.puntuacion === estrellas).length;
      return { estrellas, cantidad, porcentaje: (cantidad / total) * 100 };
    });
  });

  readonly etiquetaEstado = ETIQUETA_ESTADO;
  readonly etiquetaGenero = ETIQUETA_GENERO;

  iniciales(nombre: string): string {
    return nombre
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('');
  }

  formatoNota(nota: number): string {
    return nota.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  anio(fechaIso: string): number {
    return new Date(fechaIso).getFullYear();
  }

  fecha(fechaIso: string): string {
    return new Date(fechaIso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  estrellas(puntuacion: number): string {
    const n = Math.round(puntuacion);
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  private cargar(usuario: Usuario, articulos$: ReturnType<PerfilService['getMisArticulos']>) {
    return forkJoin({
      articulos: articulos$,
      valoraciones: this.perfilService.getValoraciones(usuario.id),
    }).pipe(map(({ articulos, valoraciones }): DatosPerfil => ({ usuario, articulos, valoraciones })));
  }
}
