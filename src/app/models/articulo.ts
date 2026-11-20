export interface Vendedor {
  usuario: string;
  iniciales: string;
  valoracion: number;
  numValoraciones: number;
  tiempoRespuesta: string;
}

export interface Articulo {
  id: string;
  titulo: string;
  precio: number;
  categoria: string;
  estado: string;
  talla: string;
  descripcion: string;
  publicado: string;
  imagenes: string[];
  ubicacion: string;
  vendedor: Vendedor;
}
