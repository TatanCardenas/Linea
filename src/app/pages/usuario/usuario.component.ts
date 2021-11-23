import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Conductor } from 'src/app/_model/Conductor';
import { ProgressService } from 'src/app/_service/progress.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EliminarDialogComponent } from './eliminar-dialog/eliminar-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'direccion', 'nombreEmpresa', 'celular', 'correo', 'ciudad', 'editar', 'borrar'];
  dataSource = new MatTableDataSource<Conductor>();
  public totalPages: number;
  public totalElement: number;
  public pageAct: number;
  public paginaSize = 1;

  // MatPaginator Inputs
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [1, 5, 10, 25, 100];
  pageIndex = 0;

  pageR: boolean;
  public flagPagina: boolean = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: UsuarioService,
    private progressService: ProgressService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.progressService.progressBarReactiva.next(false);
    await new Promise(f => setTimeout(f, 1100));
    this.inicioU();
    this.usuarioService.paginaReactiva.subscribe(data => {
      this.inicioU();
    });
  }

  async inicioU() {
    this.usuarioService.listarConductor(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource.data = data.content;
      //console.log("Hola: " + data.content)
      this.length = data.totalElements;
      this.dataSource.sort = this.sort;
      this.progressService.progressBarReactiva.next(true);
    });
  }

  // MatPaginator Output
  pageEvent: PageEvent;
  public cambioPagina(ev: any) {
    this.pageSize = ev.pageSize;
    this.pageIndex = ev.pageIndex;
    this.length = ev.length;
    this.inicioU();

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarC(id:number){
    if(id != null){
      this.usuarioService.eliminarConductor(id).subscribe(data =>{
        console.log("Eliminado correctamente");
        this.openSnackBar("Eliminado correctamente");
        this.usuarioService.paginaReactiva.next(true);
      });
    }
    
  }

  openDialog(user:string, idUser:number):void{
    let conductor = new Conductor();
    conductor.nombre = user;
    conductor.idUsuario = idUser;
    const dialogRef = this.dialog.open(EliminarDialogComponent, {
      width: '380px',
      data: {name: user, id: idUser},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(result);
      this.eliminarC(result);
    });
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


}
