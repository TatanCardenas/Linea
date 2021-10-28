import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../_model/Vehiculo';
import { Contenido } from '../_model/Contenido';
import { EMPTY, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private url : string = `${environment.HOST}/vehiculos`;
  paginaReactiva= new Subject<boolean>();
  public paginaR: boolean;
  
  constructor(private http: HttpClient) { }

  public recargarPagina(paginaReactiva: boolean){
    if(paginaReactiva == true ){
      return window.location.reload();
    }else{
      return EMPTY;
    }
  }

  public listarVehiculo(page: number, size: number){
    return this.http.get<Contenido>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  public guardarVehiculo(vehiculo: Vehiculo){
    return this.http.post(`${this.url}/guardar`,vehiculo);
  }

  public editarVehiculo(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`,vehiculo)
  }

  public editarVehiculoError(vehiculo: Vehiculo){
    return this.http.post(`${this.url}/editar`,vehiculo)
  }

  public vehiculoId(idVehiculo:number ){
    return this.http.get<Vehiculo>(`${this.url}/listar/${idVehiculo}`)
  }

}
