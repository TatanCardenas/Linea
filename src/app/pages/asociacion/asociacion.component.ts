import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { ProgressService } from 'src/app/_service/progress.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsociarDialogComponent } from './asociar-dialog/asociar-dialog.component';

@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styleUrls: ['./asociacion.component.css']
})
export class AsociacionComponent implements OnInit {
  displayedColumns: string[] = ['placa', 'asociados', 'asociar'];
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
    private progressService: ProgressService,
    public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.progressService.progressBarReactiva.next(false);
    await new Promise(f => setTimeout(f,1500));
    this.inicio();
    this.vehiculoService.paginaReactiva.subscribe(data => {
      this.inicio();
    });
  }

  async inicio() {
    this.vehiculoService.listarVehiculo(this.pageIndex, this.pageSize).subscribe(data => {
      (this.dataSource.data = data.content)
      //console.log("v: "+this.dataSource.data);
      this.length = data.totalElements;
      this.dataSource.sort = this.sort;
      this.progressService.progressBarReactiva.next(true);
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  public cambioPagina(ev: any) {
    this.pageSize = ev.pageSize;
    this.pageIndex = ev.pageIndex;
    this.length = ev.length;
    this.inicio();

  }


  openDialogAsociar(placa:string, id:number):void{
    let placaV = placa;
    let idV = id;
    const dialogRef = this.dialog.open(AsociarDialogComponent, {
      width: '600px',
      data: {placa: placaV, id: idV},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(result);
      //this.eliminarC(result);
    });
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
