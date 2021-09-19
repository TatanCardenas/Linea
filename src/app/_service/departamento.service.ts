import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../_model/Departamento';
import { Ciudad } from '../_model/Ciudad'
 
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url : string = `${environment.HOST}/departamentos`;
  private url1: string = `${environment.HOST}/departamentos`;
  constructor(private http: HttpClient ) { }

  public listar(){
    return this.http.get<Departamento[]>(`${this.url}/listar`);
  }

  public listarCiudad(idDepartamentoB:number){
    return this.http.get<Ciudad[]>(`${this.url}/ciudad/listarPorDepartamnto/${idDepartamentoB}`)
  }

}
