import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conductor } from 'src/app/_model/Conductor';

@Component({
  selector: 'app-eliminar-dialog',
  templateUrl: './eliminar-dialog.component.html',
  styleUrls: ['./eliminar-dialog.component.css']
})
export class EliminarDialogComponent implements OnInit {
public name: String;
  constructor(public dialogRef: MatDialogRef<EliminarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      //this.name = data.conductor.nombre;
    }

  ngOnInit(): void {
    //console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
