import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../_model/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private url : string = `${environment.HOST}/vehiculos`;

  constructor(private http: HttpClient) { }

  public listarVehiculo(page: number, size: number){
    return this.http.get<Vehiculo[]>(`${this.url}/pageable?page=${page}/&size${size}`);
  }

  public guardar(vehiculo: Vehiculo){
    return this.http.post(`${this.url}/guardar`,vehiculo);
  }

  public editar(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`,vehiculo)
  }
}
