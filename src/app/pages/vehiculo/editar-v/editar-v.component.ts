import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editar-v',
  templateUrl: './editar-v.component.html',
  styleUrls: ['./editar-v.component.css']
})
export class EditarVComponent implements OnInit {

  form: FormGroup;
  private idVehiculo: number;

  private datosVehiculo = new Vehiculo;
  selectedValue: string;
  selectedCar: string;

  cars: Car[] = [
    {value: 'Toyota', viewValue: 'Toyota'},
    {value: 'Chevrolet', viewValue: 'Chevrolet'},
    {value: 'Renault', viewValue: 'Renault'},
    {value: 'Mazda', viewValue: 'Mazda'},
    {value: 'Mercedes', viewValue: 'Mercedes'},
    {value: 'BMW', viewValue: 'BMW'},
    {value: 'AlfaRomeo', viewValue: 'Alfa Romeo'},
    {value: 'Audi', viewValue: 'Audi'},
    {value: 'Ferrari', viewValue: 'Ferrari'},
    {value: 'Peugeot', viewValue: 'Peugeot'},
    {value: 'Porche', viewValue: 'Porche'}
  ];

  constructor(private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {

      this.route.params.subscribe((params: Params) => {        //Obtener parametros que estan en le url
        this.idVehiculo = params['idV'];
        //console.log("Antes.");
        this.vehiculoService.vehiculoId(this.idVehiculo).subscribe(data => {
          this.datosVehiculo.idVehiculo = data.idVehiculo;
          this.datosVehiculo.placa = data.placa;
          this.datosVehiculo.modelo = data.modelo;
          this.datosVehiculo.marca = data.marca;
          this.datosVehiculo.tipoVehiuclo = data.tipoVehiuclo;
          this.datosVehiculo.capacidad = data.capacidad;
          //console.log(`id: ${data.idVehiculo } - Placa: ${data.placa} - Model ${data.modelo}`);
          this.buildFrom();
        });
        
      });
     }

  ngOnInit(): void {
    this.buildFrom();
  }

  private buildFrom() {
    
    this.form = this.formBuilder.group({
      
      placa: [this.datosVehiculo.placa, [Validators.required,Validators.maxLength(7), Validators.minLength(7),Validators.pattern(/[a-zA-Z ]{3}[-]\d{3}/)]],
      modelo: [this.datosVehiculo.modelo, [Validators.required, Validators.min(1998), Validators.max(2022)]],
      marca: [this.datosVehiculo.marca,],
      tipoVehiuclo: [this.datosVehiculo.tipoVehiuclo, [Validators.required]],
      capacidad: [this.datosVehiculo.capacidad, [Validators.required]],
    });
  }

  editarv(event: Event){
    event.preventDefault();
    const value = this.form.value;
    
    this.datosVehiculo = this.form.value;
    this.datosVehiculo.idVehiculo= Number(this.idVehiculo);
    //console.log(this.datosVehiculo);
    //console.log(`id: ${this.datosVehiculo.idVehiculo}`);
    this.vehiculoService.editarVehiculo(this.datosVehiculo).subscribe(data =>{
      console.log(data);
      this.openSnackBar("Vehiculo editado correctamente");  
    }, err => {
      
      this.openSnackBar(err.error.message)    
    })


  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
