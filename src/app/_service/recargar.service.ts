import { Injectable } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecargarService {

  paginaReactiva= new Subject<boolean>();
  rolUsuario= new Subject<string>();
  
  constructor(private http: HttpClient) { }

  /*public recargarPagina(paginaReactiva: boolean){
    if(paginaReactiva == true ){
      return window.location.reload();
    }else{
      return EMPTY;
    }
  }*/
  
}
