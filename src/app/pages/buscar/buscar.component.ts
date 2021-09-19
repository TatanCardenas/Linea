import { ScrollingVisibility } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DepartamentoService } from '../../_service/departamento.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    console.log("Se ejecuto al iniciar")
    this.departamentoService.listar().subscribe(data =>{
      console.log(data);
      data.forEach(element => { console.log(`Codigo: ${element.idDepartamento} - Nombre: ${element.nombre}`)}) 
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
