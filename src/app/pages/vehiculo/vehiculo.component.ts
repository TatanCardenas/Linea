import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service'

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string[] = ['placa', 'modelo', "marca", "tipoVehiuclo", "capacidad"];
  dataSource = new MatTableDataSource<Vehiculo>();

  @ViewChild('PVehiculo') paginator: MatPaginator;

  constructor(private vehiculoService: VehiculoService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
/*     let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.capacidad = "1"
    this.vehiculoService.guardar(vehiculo).subscribe(data =>{
      console.log("Se registro su vehiculo");
    }, err =>{
      console.log("No se agrego");
      this.openSnackBar(err.error.message);    
    }); */

    this.vehiculoService.listarVehiculo(0, 10).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
    });
  }

  private openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Info', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
