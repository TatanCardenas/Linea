import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asociar-dialog',
  templateUrl: './asociar-dialog.component.html',
  styleUrls: ['./asociar-dialog.component.css']
})
export class AsociarDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AsociarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
