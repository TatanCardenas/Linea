import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Conductor } from 'src/app/_model/Conductor';
import { Departamento } from 'src/app/_model/Departamento';
import { Documento } from 'src/app/_model/Documento';
import { Rol } from 'src/app/_model/Rol';
import { DepartamentoService } from 'src/app/_service/departamento.service';
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
public idCity:Ciudad[];
public departamento:Departamento[];
public flagCiudad = true;
private ciudadId:number;

private nickC: String;
private pass: String;
public hide = true;

  constructor(private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService : DepartamentoService,
    private recargarService: RecargarService) {

      this.route.params.subscribe((params: Params) => {        //Obtener parametros que estan en le url
        this.datosConductor.idUsuario = params['idConductor'];
        this.idUser = params['idConductor'];
        //console.log("Antes.");
        this.usuarioService.conductorId(this.idUser).subscribe(data => {
          this.datosConductor = data;
          this.datosConductor.ciudad.idCiudad;
          this.nickC = data.nick;
          this.pass = data.clave;
         // console.log("Conductor: "+ this.datosConductor.nombre);
          //console.log("ConductorNick: "+ this.datosConductor.nick);
          //console.log(`id: ${data.idVehiculo } - Placa: ${data.placa} - Model ${data.modelo}`);
          this.buildFrom();
        });
        
      });

     }

  ngOnInit(): void {
    this.buildFrom();
    this.departamentoService.listar().subscribe((dep:Departamento[])=>{
      (this.departamento=dep);  
    });

  }

  private buildFrom() {
    
    this.form = this.formBuilder.group({
      
      nombre: [this.datosConductor.nombre, [Validators.required,Validators.maxLength(23), Validators.minLength(3)]],
      apellido: [this.datosConductor.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(23)]],
      documento: [this.datosConductor.documento,[Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      celular: [this.datosConductor.celular,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nick: [this.datosConductor.nick, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      clave: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      direccion: [this.datosConductor.direccion,[Validators.required, Validators.minLength(10)]],
      celularAux: [this.datosConductor.celularAux, [Validators.minLength(10), Validators.maxLength(10)]],
      correo: [this.datosConductor.correo, [Validators.required,Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/)]],
      idCiudad: ['', [Validators.required]],
      nombreEmpresa: [this.datosConductor.nombreEmpresa, [Validators.required]],

    });
  }

  editarU(event: Event){
    this.datosConductor = this.form.value;
    this.datosConductor.idUsuario= Number(this.idUser);

    this.datosConductor.ciudad = new Ciudad();
    this.datosConductor.rol = new Rol();
    this.datosConductor.tipoDocumento = new Documento();
    this.datosConductor.ciudad.idCiudad = this.form.value.idCiudad;
    /*this.datosConductor.clave = this.pass;
    this.datosConductor.nick = this.nickC;*/
    this.usuarioService.editarConductor(this.datosConductor).subscribe(data =>{
      console.log(data);
      this.openSnackBar("Conductor editado correctamente");
      //this.datosConductor.paginaR = true;
      this.recargarService.paginaReactiva.next(true);
      this.usuarioService.paginaReactiva.next(true);
      this.router.navigate(['/usuario']);
    }, err => {
      
      this.openSnackBar(err.error.message);    
    })
  }

  selectD(dep){
    //console.log(dep);
    this.departamentoService.listarCiudad(dep).subscribe((city: Ciudad[])=>{
      this.idCity = city;
      this.flagCiudad = false;    
    });
  }

  select(ciudad){
    this.ciudadId = ciudad.idCiudad;
    //console.log(ciudad.nombre);
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
