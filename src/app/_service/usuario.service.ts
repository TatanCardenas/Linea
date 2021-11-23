import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Conductor } from '../_model/Conductor';
import { ContenidoU } from '../_model/ContenidoU';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url : string = `${environment.HOST}/usuarios`;
  paginaReactiva= new Subject<boolean>();
  public paginaR: boolean;
  private rol = 4;
  constructor(private http: HttpClient) { }

  public agregarConductor(conductor: Conductor){
    return this.http.post(`${this.url}/guardar`,conductor);
  }

  public editarConductor(conductor: Conductor){
    return this.http.put(`${this.url}/editar`,conductor);
  }

  public conductorId(idUser: number){
    return this.http.get<Conductor>(`${this.url}/listar/${idUser}`);
  }
  /*public listarConductor(page: number, size: number){
    return this.http.get<ContenidoU>(`${this.url}/pageable?page=${page}&size=${size}`);
  }*/
  public listarConductor(page: number, size: number){
    return this.http.get<ContenidoU>(`${this.url}/pageablePorRol/${this.rol}/${page}/${size}`);
  }

  public eliminarConductor(idUser: number){
    return this.http.delete(`${this.url}/eliminar/${idUser}`);
  }

}
