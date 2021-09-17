import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule
    
  ], exports :[
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
