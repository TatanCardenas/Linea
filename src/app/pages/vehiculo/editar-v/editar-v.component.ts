import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { RecargarService } from 'src/app/_service/recargar.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

interface Car {
  valueC: string;
  viewValueC: string;
}
interface Tipo {
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
    {valueC: 'Toyota', viewValueC: 'Toyota'},
    {valueC: 'Chevrolet', viewValueC: 'Chevrolet'},
    {valueC: 'Renault', viewValueC: 'Renault'},
    {valueC: 'Mazda', viewValueC: 'Mazda'},
    {valueC: 'Mercedes', viewValueC: 'Mercedes'},
    {valueC: 'BMW', viewValueC: 'BMW'},
    {valueC: 'AlfaRomeo', viewValueC: 'Alfa Romeo'},
    {valueC: 'Audi', viewValueC: 'Audi'},
    {valueC: 'Ferrari', viewValueC: 'Ferrari'},
    {valueC: 'Peugeot', viewValueC: 'Peugeot'},
    {valueC: 'Porche', viewValueC: 'Porche'}
  ];

  tipos: Tipo[] = [
    {value: 'Carro', viewValue: 'Carro'},
    {value: 'Camioneta', viewValue: 'Camioneta'},
    {value: 'Furgon', viewValue: 'Furgon'},
    {value: 'Campero', viewValue: 'Campero'}
  ];

  constructor(private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recargarService: RecargarService
    ) {

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
      
      placa: [this.datosVehiculo.placa, [Validators.required,Validators.maxLength(7), Validators.minLength(7),Validators.pattern(/[A-Z ]{3}[-]\d{3}/)]],
      modelo: [this.datosVehiculo.modelo, [Validators.required, Validators.min(1998), Validators.max(2022), Validators.pattern(/^[0-9]\d+$/)]],
      marca: [this.datosVehiculo.marca,[Validators.required, Validators.minLength(3)]],
      tipoVehiuclo: [this.datosVehiculo.tipoVehiuclo, [Validators.required]],
      capacidad: [this.datosVehiculo.capacidad, [Validators.required,Validators.max(12000), Validators.min(20),Validators.pattern(/^\d+(kg|KG|Kg)$/)]],
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
      this.vehiculoService.paginaR = true;
      this.recargarService.paginaReactiva.next(true);
      this.vehiculoService.paginaReactiva.next(true);
      this.router.navigate(['/vehiculo']);
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
