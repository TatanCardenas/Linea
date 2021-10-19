import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { async } from 'rxjs/internal/scheduler/async';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { Contenido } from 'src/app/_model/Contenido';
import { VehiculoService } from 'src/app/_service/vehiculo.service'
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ProgressService } from 'src/app/_service/progress.service';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string[] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad', 'editar'];
  dataSource = new MatTableDataSource<Vehiculo>();
  public totalPages: number;
  public totalElement: number;
  public pageAct: number;
  public paginaSize = 5;

  // MatPaginator Inputs
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;

  pageR: boolean;
  public flagPagina: boolean = true;

  @ViewChild('PVehiculo') VehiculoPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private vehiculoService: VehiculoService,
              private _snackBar: MatSnackBar,
              public route: ActivatedRoute,
              private progressService: ProgressService) {
                


               }

  async ngOnInit(): Promise<void> {
    this.inicio();
    this.vehiculoService.paginaReactiva.subscribe(data=>{
      this.listarV(this.pageEvent);
    });
    
  }

  async inicio(){
    //this.pageR = this.vehiculoService.paginaReactiva;
    this.progressService.progressBarReactiva.next(false);
    await new Promise(f => setTimeout(f,1500));
    
    this.vehiculoService.listarVehiculo(0, this.pageSize).subscribe(data => {
      (this.dataSource.data = data.content)
      this.totalPages = data.totalPages;
      this.length = data.totalElements;
      //this.index = this.pageEvent.pageIndex;
      this.totalElement = data.totalElements;
      this.dataSource.sort = this.sort;
      this.progressService.progressBarReactiva.next(true);
      //console.log(`PaginasTotales: ${this.totalPages} - Act: ${this.pageIndex}`);
      
    });
  }
  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  public async listarV(pageEvent): Promise<void>{
    let pageI = this.pageEvent.pageIndex;
    let pageS = this.pageEvent.pageSize;
    //this.progressService.progressBarReactiva.next(false);
    //await new Promise(f => setTimeout(f,1500));
    this.vehiculoService.listarVehiculo(pageI,pageS).subscribe(data => {
      (this.dataSource.data = data.content)
      this.totalPages = data.totalPages;
      this.length = data.totalElements;
      //this.index = this.pageEvent.pageIndex;
      this.totalElement = data.totalElements;
      //console.log(`PaginasTotales: ${this.totalPages} - Act: ${pageI}`);
      //this.progressService.progressBarReactiva.next(true);
    });
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Info', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
