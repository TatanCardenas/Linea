import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { async } from 'rxjs/internal/scheduler/async';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { Contenido } from 'src/app/_model/Contenido';
import { VehiculoService } from 'src/app/_service/vehiculo.service'

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
  public paginaSize;
  @ViewChild('PVehiculo') VehiculoPaginator: MatPaginator;

  constructor(private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.vehiculoService.listarVehiculo(0, this.paginaSize).subscribe(data => {
      (this.dataSource.data = data.content)
      this.totalPages = data.totalPages;
      this.totalElement = data.totalElements;

      console.log(`PaginasTotales: ${this.totalPages}`);
      data.content.forEach(element => {
        console.log(`Placa: ${element.placa} - Marca: ${element.marca}`);
      });
      this.dataSource.paginator = this.VehiculoPaginator;

/*       data.pegeable.forEach(pg =>{
        this.pageAct = pg.pageNumber;
        console.log(`Pagina actual: ${this.pageAct}`);
      }); */
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
