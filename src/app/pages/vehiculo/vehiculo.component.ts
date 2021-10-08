import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { async } from 'rxjs/internal/scheduler/async';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { Contenido } from 'src/app/_model/Contenido';
import { VehiculoService } from 'src/app/_service/vehiculo.service'
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string[] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad'];
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

  @ViewChild('PVehiculo') VehiculoPaginator: MatPaginator;

  constructor(private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.vehiculoService.listarVehiculo(2, this.pageSize).subscribe(data => {
      (this.dataSource.data = data.content)
      this.totalPages = data.totalPages;
      this.length = data.totalElements;
      //this.index = this.pageEvent.pageIndex;
      this.totalElement = data.totalElements;

      console.log(`PaginasTotales: ${this.totalPages} - Act: ${this.pageIndex}`);
    });
  }

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  public listarV(pageEvent): void{
    let pageI = this.pageEvent.pageIndex;
    let pageS = this.pageEvent.pageSize;
    this.vehiculoService.listarVehiculo(pageI,pageS).subscribe(data => {
      (this.dataSource.data = data.content)
      this.totalPages = data.totalPages;
      this.length = data.totalElements;
      //this.index = this.pageEvent.pageIndex;
      this.totalElement = data.totalElements;
      console.log(`PaginasTotales: ${this.totalPages} - Act: ${pageI}`);
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

}
