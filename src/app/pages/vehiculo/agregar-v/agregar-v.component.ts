import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecargarService } from 'src/app/_service/recargar.service';

interface Car {
  value: string;
  viewValue: string;
}

interface Tipo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agregar-v',
  templateUrl: './agregar-v.component.html',
  styleUrls: ['./agregar-v.component.css']
})

export class AgregarVComponent implements OnInit {
  form: FormGroup;
  private idVehiculo: number;

  private datosVehiculo = new Vehiculo;

  selectedValue: string;
  selectedCar: string;

  cars: Car[] = [
    { value: 'Toyota', viewValue: 'Toyota' },
    { value: 'Chevrolet', viewValue: 'Chevrolet' },
    { value: 'Renault', viewValue: 'Renault' },
    { value: 'Mazda', viewValue: 'Mazda' },
    { value: 'Mercedes', viewValue: 'Mercedes' },
    { value: 'BMW', viewValue: 'BMW' },
    { value: 'AlfaRomeo', viewValue: 'Alfa Romeo' },
    { value: 'Audi', viewValue: 'Audi' },
    { value: 'Ferrari', viewValue: 'Ferrari' },
    { value: 'Peugeot', viewValue: 'Peugeot' },
    { value: 'Porche', viewValue: 'Porche' }
  ];

  tipos: Tipo[] = [
    { value: 'Carro', viewValue: 'Carro' },
    { value: 'Camioneta', viewValue: 'Camioneta' },
    { value: 'Furgon', viewValue: 'Furgon' },
    { value: 'Campero', viewValue: 'Campero' }
  ];

  constructor(private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recargarService: RecargarService
  ) {

  }

  ngOnInit(): void {
    this.buildFrom();
  }

  private buildFrom() {

    this.form = this.formBuilder.group({

      placa: [this.datosVehiculo.placa, [Validators.required, Validators.maxLength(7), Validators.minLength(7), Validators.pattern(/[A-Z ]{3}[-]\d{3}/)]],
      modelo: [this.datosVehiculo.modelo, [Validators.required, Validators.min(1998), Validators.max(2022), Validators.pattern(/^[0-9]\d+$/)]],
      marca: [this.datosVehiculo.marca, [Validators.required, Validators.minLength(3)]],
      tipoVehiuclo: [this.datosVehiculo.tipoVehiuclo, [Validators.required]],
      capacidad: [this.datosVehiculo.capacidad, [Validators.required, Validators.max(12000), Validators.min(20), Validators.pattern(/^\d+(kg|KG|Kg)$/)]],
    });
  }

  guardarv(event: Event) {

    const value = this.form.value;
    this.datosVehiculo = this.form.value;
    this.vehiculoService.guardarVehiculo(this.datosVehiculo).subscribe(data => {
      console.log(data);
      this.openSnackBar("Vehiculo guardado correctamente");
      this.recargarService.paginaReactiva.next(true);
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
