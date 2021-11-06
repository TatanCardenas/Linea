import { Documento } from './Documento'
import { Rol } from './Rol'
export class Conductor {
    documento: String;
    nombre: String;
    apellido: String;
    nick: String;
    direccion: String;
    celular: String;
    celularAux: String;
    correo: String;
    tipoDocumento: Documento;
    rol: Rol;
}