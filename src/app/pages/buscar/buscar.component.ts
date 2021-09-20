import { DataSource } from '@angular/cdk/collections';
import { ScrollingVisibility } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map, startWith, timeout } from 'rxjs/operators';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from '../../_service/departamento.service';
import { LoaderService } from '../../_service/loader.service'

export interface Departamentos{
  nombre: string;
  idDepartamento: number;
  buscar: MatButton;
}
export interface Ciudad{
  nombreC: string;
  idDepartC: number;
}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  mostrarBarra: boolean;
  color: ThemePalette = 'accent';
  displayedColumns: string[] = ['idDepartamento', 'nombre', "buscar"];
  displayedColumnas: string[] = ['idDepartC', 'nombreC'];

  constructor(private departamentoService: DepartamentoService, public loaderService: LoaderService) { }

  departamentos: Departamento[];
  columnas;
  dataSource;

  columnasC;
  dataSourceC;

  async ngOnInit(): Promise<void> {
    console.log("Se ejecuto al iniciar")
    await this.delay(1500);
    this.mostrarBarra = true;
    this.departamentoService.listar().subscribe(async data =>{
      this.dataSource = data;
      data.forEach( element => { 
        this.departamentos = data;
        this.columnas =[
          {titulo: "id", campo: element.idDepartamento},
          {titulo: "Nombre", campo: element.nombre},
          {titulo: "Buscar", campo: "buscar"}
        ];
        

      }) 
        
    });
  }
  private delay(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  buscarId (idDepartamentoB: number){
    this.departamentoService.listarCiudad(idDepartamentoB).subscribe(ciudad =>{
      this.dataSourceC = ciudad;
      ciudad.forEach(element => { console.log(
        `Codigo: ${element.idCiudad} 
        - Nombre: ${element.nombre}`)
        this.columnasC =[
          {titulo: "idCiudad", campo: element.idCiudad},
          {titulo: "NombreC", campo: element.nombre}
        ];  
      })
    })
  }
    
}
