import { ScrollingVisibility } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from '../../_service/departamento.service';

export interface Departamentos{
  nombre: string;
  idDepartamento: number;
  buscar: MatButton;

}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  displayedColumns: string[] = ['idDepartamento', 'nombre', "buscar"];

  constructor(private departamentoService: DepartamentoService) { }

  departamentos: Departamento[];
  columnas;
  dataSource;
  ngOnInit(): void {
    console.log("Se ejecuto al iniciar")
    this.departamentoService.listar().subscribe(data =>{
      this.dataSource = data;
      data.forEach(element => { console.log(
        `Codigo: ${element.idDepartamento} 
        - Nombre: ${element.nombre}`)
        this.departamentos = data;
        this.columnas =[
          {titulo: "id", campo: element.idDepartamento},
          {titulo: "Nombre", campo: element.nombre},
          {titulo: "Buscar", campo: "buscar"}
        ];
      }) 
        
    });
  }
}
