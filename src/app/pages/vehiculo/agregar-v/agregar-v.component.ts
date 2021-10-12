import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/Vehiculo';

@Component({
  selector: 'app-agregar-v',
  templateUrl: './agregar-v.component.html',
  styleUrls: ['./agregar-v.component.css']
})
export class AgregarVComponent implements OnInit {
  form: FormGroup;
  placa: string;
  modelo: string;
  marca: string;
  tipo: string;
  capacidad: string;

  datosVehiculo = new Vehiculo;

  constructor(private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params: Params) => {        //Obtener parametros que estan en le url
      let idVehiculo = params['idV'];
      console.log("Antes.");
      this.vehiculoService.vehiculoId(idVehiculo).subscribe(data => {

        this.datosVehiculo.placa = data.placa;
        this.datosVehiculo.modelo = data.modelo;
        this.datosVehiculo.marca = data.marca;
        this.datosVehiculo.tipoVehiuclo = data.tipoVehiuclo;
        this.datosVehiculo.capacidad = data.capacidad;
        console.log(`Placa: ${data.placa} - Model ${data.modelo}`);
        this.buildFrom();
      });
      
    });
    
  }

  ngOnInit(): void {
    this.buildFrom();
  }

  private buildFrom() {
    console.log("Hola");
    this.form = this.formBuilder.group({
      Placa: [this.datosVehiculo.placa, [Validators.required]],
      Modelo: [this.datosVehiculo.modelo, [Validators.required]],
      Marca: [this.datosVehiculo.marca, [Validators.required]],
      TVehiculo: [this.datosVehiculo.tipoVehiuclo, [Validators.required]],
      Capacidad: [this.datosVehiculo.capacidad, [Validators.required]],
    });
  }

  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    console.log(value);
  }

  editarv(event: Event){
    console.log("EDITAR");
    event.preventDefault();
    const value = this.form.value;
    console.log(value);
  }

}
