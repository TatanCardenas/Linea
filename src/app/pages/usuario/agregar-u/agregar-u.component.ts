import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Conductor } from 'src/app/_model/Conductor';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-agregar-u',
  templateUrl: './agregar-u.component.html',
  styleUrls: ['./agregar-u.component.css']
})
export class AgregarUComponent implements OnInit {
  form: FormGroup;
  public datosConductor = new Conductor;
  public idCiudad:Ciudad[];
  public departamento:Departamento[];
  constructor(private formBuilder: FormBuilder,
    private departamentoService : DepartamentoService) { 
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
      
      nombre: [this.datosConductor.nombre, [Validators.required,Validators.maxLength(3), Validators.minLength(23)]],
      apellido: [this.datosConductor.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(23)]],
      celular: [this.datosConductor.celular,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      celularAux: [this.datosConductor.celularAux, [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      correo: [this.datosConductor.correo, [Validators.required,Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/)]],
      //idCiudad: [this.datosConductor.ciudad.idCiudad, [Validators.required]],
      nombreEmpresa: [this.datosConductor.nombreEmpresa, [Validators.required]],

    });
  }

  agregarConductor(){
    return onkeydown;
  }
}
