import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Conductor } from 'src/app/_model/Conductor';
import { Departamento } from 'src/app/_model/Departamento';
import { Documento } from 'src/app/_model/Documento';
import { Rol } from 'src/app/_model/Rol';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { UsuarioService } from 'src/app/_service/usuario.service'

@Component({
  selector: 'app-agregar-u',
  templateUrl: './agregar-u.component.html',
  styleUrls: ['./agregar-u.component.css']
})
export class AgregarUComponent implements OnInit {
  form: FormGroup;
  public datosConductor = new Conductor();
  public idCity:Ciudad[];
  public departamento:Departamento[];
  public flagCiudad = true;
  private ciudadId:number;

  public hide = true;
  constructor(private formBuilder: FormBuilder,
    private departamentoService : DepartamentoService,
    private usuarioService : UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar) { 
      //this.buildFrom();
    }

  ngOnInit(): void {
    
    this.buildFrom();
    this.departamentoService.listar().subscribe((dep:Departamento[])=>{
      (this.departamento=dep) 
    });
  }
  private buildFrom() {
    
    this.form = this.formBuilder.group({
      
      nombre: [this.datosConductor.nombre, [Validators.required,Validators.maxLength(23), Validators.minLength(3)]],
      apellido: [this.datosConductor.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(23)]],
      documento: [this.datosConductor.documento,[Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      nick: [this.datosConductor.nick, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      clave: [this.datosConductor.clave, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]], 
      celular: [this.datosConductor.celular,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      direccion: [this.datosConductor.direccion,[Validators.required, Validators.minLength(10)]],
      celularAux: [this.datosConductor.celularAux, [Validators.minLength(10), Validators.maxLength(10)]],
      correo: [this.datosConductor.correo, [Validators.required,Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/)]],
      idCiudad: ['', [Validators.required]],
      nombreEmpresa: [this.datosConductor.nombreEmpresa, [Validators.required]],

    });
  }

  agregarConductor(){
    this.datosConductor = this.form.value;
    this.datosConductor.ciudad = new Ciudad();
    this.datosConductor.rol = new Rol();
    this.datosConductor.tipoDocumento = new Documento();
    this.datosConductor.ciudad.idCiudad = this.form.value.idCiudad;
    
    this.usuarioService.agregarConductor(this.datosConductor).subscribe(data=>{
      this.openSnackBar("Conductor agregado correctamente");
      this.usuarioService.paginaReactiva.next(true);
      this.router.navigate(['/usuario']);
    });
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
