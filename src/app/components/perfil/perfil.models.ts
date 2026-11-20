export type Talla = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'UNICA';
export type Genero = 'H' | 'M' | 'UNISEX';
export type EstadoArticulo = 'BORRADOR' | 'PUBLICADO' | 'EN_REVISION' | 'RETIRADO' | 'VENDIDO';

/** Datos visibles de cualquier usuario (perfil público). */
export interface UsuarioPublico {
  id: number;
  username: string;
  foto: string | null;
  /** Provincia del usuario. */
  localizacion: string;
  /** Fecha ISO. */
  creado_en: string;
  valoracion_media: number;
  num_valoraciones: number;
}

/** Datos extra que solo ve el propio usuario. */
export interface UsuarioPropio extends UsuarioPublico {
  nombre: string;
  apellidos: string;
  email: string;
}

export type Usuario = UsuarioPublico | UsuarioPropio;

export interface EmisorValoracion {
  username: string;
  foto: string | null;
}

export interface Valoracion {
  /** 1-5 */
  puntuacion: number;
  comentario: string;
  /** Fecha ISO. */
  fecha: string;
  emisor: EmisorValoracion;
}

export interface Articulo {
  id: number;
  titulo: string;
  precio: number;
  talla: Talla;
  genero: Genero;
  marca?: string;
  foto_principal: string;
  estado: EstadoArticulo;
}
