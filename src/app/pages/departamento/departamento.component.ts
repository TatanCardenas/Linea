import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { ScrollingVisibility } from '@angular/cdk/overlay';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map, startWith, timeout, timestamp } from 'rxjs/operators';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from '../../_service/departamento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudad } from 'src/app/_model/Ciudad';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ProgressService } from 'src/app/_service/progress.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  mostrar: boolean = true; 
  mostrarBarra: boolean;
  mostrarTabla: boolean = true;
  displayedColumns: string[] = ['idDepartamento', 'nombre', "buscar"];
  
  dataSource = new MatTableDataSource<Departamento>();
  

@ViewChild('PDepartamento') paginator: MatPaginator;

@ViewChild(MatSort) sort: MatSort;

  constructor(private departamentoService: DepartamentoService,
              public route: ActivatedRoute,
              private progressService: ProgressService) { }

  async ngOnInit() {
    
    this.progressService.progressBarReactiva.next(false);
    //this.mostrarBarra = true;
    await new Promise(f => setTimeout(f,1500));
    this.departamentoService.listar().subscribe(async data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.progressService.progressBarReactiva.next(true);
    });
    
    //this.mostrar = false;
    
  }
  private delay(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
