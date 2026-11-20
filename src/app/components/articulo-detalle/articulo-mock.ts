import { Articulo } from '../../models/articulo';

// Datos de ejemplo hasta que exista el servicio de artículos.
export const ARTICULO_MOCK: Articulo = {
  id: '1',
  titulo: 'Chaqueta denim vintage',
  precio: 38,
  categoria: 'Ropa',
  estado: 'Muy buen estado',
  talla: 'M',
  descripcion:
    'Chaqueta vaquera de corte oversize, cuidada y sin marcas. Tejido resistente y perfecto para entretiempo.',
  publicado: 'Hace 2 días',
  imagenes: [
    'assets/articulo-detalle/chaqueta-1.jpg',
    'assets/articulo-detalle/chaqueta-2.jpg',
    'assets/articulo-detalle/chaqueta-3.jpg',
    'assets/articulo-detalle/chaqueta-4.jpg',
  ],
  ubicacion: 'Madrid, Centro',
  vendedor: {
    usuario: 'marta.c',
    iniciales: 'MC',
    valoracion: 4.9,
    numValoraciones: 36,
    tiempoRespuesta: 'Responde normalmente en menos de 1 hora',
  },
};
