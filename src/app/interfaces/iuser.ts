export interface IUser {
    id?: number,
    nombre: string,
    apellidos: string,
    username: string,
    email: string,
    foto?: string,
    password: string,
    localizacion: string,
    codigo_postal: number,
    esta_activo?: number,
    creado_en?: string
}
