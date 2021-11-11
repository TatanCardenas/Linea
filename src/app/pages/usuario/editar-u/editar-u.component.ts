import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Conductor } from 'src/app/_model/Conductor';
import { RecargarService } from 'src/app/_service/recargar.service';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-editar-u',
  templateUrl: './editar-u.component.html',
  styleUrls: ['./editar-u.component.css']
})
export class EditarUComponent implements OnInit {
private datosConductor = new Conductor;
private idUser:number;
form: FormGroup;
  constructor(private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recargarService: RecargarService) {
      this.route.params.subscribe((params: Params) => {        //Obtener parametros que estan en le url
        this.datosConductor.idUsuario = params['idConductor'];
        this.idUser = params['idConductor'];
        //console.log("Antes.");
        this.usuarioService.conductorId(this.idUser).subscribe(data => {
          this.datosConductor = data;
          console.log("Conductor: "+ this.datosConductor.nombre);
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
      
      nombre: [this.datosConductor.nombre, [Validators.required,Validators.maxLength(7), Validators.minLength(7),Validators.pattern(/[A-Z ]{3}[-]\d{3}/)]],
      apellido: [this.datosConductor.apellido, [Validators.required, Validators.min(1998), Validators.max(2022), Validators.pattern(/^[0-9]\d+$/)]],
      celular: [this.datosConductor.celular,[Validators.required, Validators.minLength(3)]],
      celularA: [this.datosConductor.celularAux, [Validators.required]],
      correo: [this.datosConductor.correo, [Validators.required,Validators.max(12000), Validators.min(20),Validators.pattern(/^\d+(kg|KG|Kg)$/)]],
    });
  }

  editarv(event: Event){
    event.preventDefault();
    const value = this.form.value;
    
    this.datosConductor = this.form.value;
    this.datosConductor.idUsuario= Number(this.idUser);
    //console.log(this.datosVehiculo);
    //console.log(`id: ${this.datosVehiculo.idVehiculo}`);
    this.usuarioService.editarConductor(this.datosConductor).subscribe(data =>{
      console.log(data);
      this.openSnackBar("Vehiculo editado correctamente");
      //this.datosConductor.paginaR = true;
      this.recargarService.paginaReactiva.next(true);
      this.usuarioService.paginaReactiva.next(true);
      this.router.navigate(['/usuario']);
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
