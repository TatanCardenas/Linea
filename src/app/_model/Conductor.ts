import { Ciudad } from './Ciudad';
import { Documento } from './Documento'
import { Rol } from './Rol'

export class Conductor {
    idUsuario: number;
    documento: String;
    nombre: String;
    apellido: String;
    nick: String;
    direccion: String;
    celular: String;
    celularAux: String;
    correo: String;
    nombreEmpresa: String;
    tipoDocumento: Documento;
    rol: Rol;
    ciudad: Ciudad;
}