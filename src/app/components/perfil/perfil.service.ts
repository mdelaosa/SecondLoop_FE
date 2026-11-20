import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Articulo, UsuarioPropio, UsuarioPublico, Valoracion } from './perfil.models';

/**
 * Datos de ejemplo mientras no exista API.
 * Sustituir cada método por la llamada HTTP correspondiente manteniendo la firma.
 */
@Injectable({ providedIn: 'root' })
export class PerfilService {
  private readonly fotoMock = '/mock/blazer-lino.jpg';

  getPerfilPropio(): Observable<UsuarioPropio> {
    return of({
      id: 1,
      username: 'Clara M.',
      foto: null,
      localizacion: 'Madrid',
      creado_en: '2023-03-14T10:00:00Z',
      valoracion_media: 4.9,
      num_valoraciones: 4,
      nombre: 'Clara',
      apellidos: 'Martín López',
      email: 'clara@example.com',
    });
  }

  getUsuario(id: number): Observable<UsuarioPublico> {
    return of({
      id,
      username: 'Clara M.',
      foto: null,
      localizacion: 'Madrid',
      creado_en: '2023-03-14T10:00:00Z',
      valoracion_media: 4.9,
      num_valoraciones: 4,
    });
  }

  /** Perfil propio: todos los artículos, cualquier estado. */
  getMisArticulos(): Observable<Articulo[]> {
    return of(this.articulos());
  }

  /** Perfil público: solo artículos publicados. */
  getArticulosPublicados(usuarioId: number): Observable<Articulo[]> {
    return of(this.articulos().filter((a) => a.estado === 'PUBLICADO'));
  }

  getValoraciones(usuarioId: number): Observable<Valoracion[]> {
    return of([
      {
        puntuacion: 5,
        comentario:
          'La prenda estaba impecable y era exactamente como en las fotos. Envío rapidísimo y comunicación muy fácil.',
        fecha: '2026-11-16T09:00:00Z',
        emisor: { username: 'Paula N.', foto: null },
      },
      {
        puntuacion: 5,
        comentario:
          'Todo perfecto. El paquete estaba muy cuidado y Clara fue encantadora resolviendo mis dudas sobre la talla.',
        fecha: '2026-10-30T09:00:00Z',
        emisor: { username: 'Elena R.', foto: null },
      },
      {
        puntuacion: 4,
        comentario: 'Muy buena experiencia y descripción precisa. La volvería a comprar sin dudar.',
        fecha: '2026-09-18T09:00:00Z',
        emisor: { username: 'Sofía T.', foto: null },
      },
      {
        puntuacion: 5,
        comentario: 'Una vendedora de diez. Respondió rápido y la chaqueta llegó antes de lo previsto.',
        fecha: '2026-08-20T09:00:00Z',
        emisor: { username: 'Mónica L.', foto: null },
      },
    ]);
  }

  private articulos(): Articulo[] {
    const base = { foto_principal: this.fotoMock, genero: 'M' as const };
    return [
      { ...base, id: 1, titulo: 'Blazer de lino crudo', precio: 38, talla: 'M', marca: 'Massimo Dutti', estado: 'PUBLICADO' },
      { ...base, id: 2, titulo: 'Camisa de algodón', precio: 18, talla: 'S', marca: 'COS', estado: 'VENDIDO' },
      { ...base, id: 3, titulo: 'Pantalón sastre', precio: 25, talla: 'M', estado: 'EN_REVISION' },
      { ...base, id: 4, titulo: 'Chaqueta ligera', precio: 30, talla: 'L', genero: 'UNISEX', marca: 'Zara', estado: 'BORRADOR' },
      { ...base, id: 5, titulo: 'Vestido midi', precio: 22, talla: 'UNICA', estado: 'RETIRADO' },
    ];
  }
}
