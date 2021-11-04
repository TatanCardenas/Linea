import { Component, Input, OnInit } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/_service/login.service'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../_model/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";  
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { RecargarService } from 'src/app/_service/recargar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @Input()
  resultadoHija : number;

  usuario: string;
  password: string;
  formul: FormGroup;
  hide = true;
  private usuarioL = new Usuario;
  mensajeError: string ='';

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private vehiculoService: VehiculoService,
              private recargarService: RecargarService
              ) { }

  ngOnInit(): void {
    this.buildFrom();
  }

  private buildFrom() {
    
    this.formul = this.formBuilder.group({    
      user: [this.usuarioL.user, [Validators.required,Validators.maxLength(15), Validators.minLength(3)]],
      pass: [this.usuarioL.pass, [Validators.required,Validators.minLength(4), Validators.maxLength(15)]],
    });
  }
  
  ingresar(event: Event){
    this.usuarioL = this.formul.value;
    this.usuario = this.usuarioL.user;
    this.password = this.usuarioL.pass
     this.loginService.login(this.usuario,this.password).subscribe(data =>{
      console.log(data);
      this.openSnackBar("Login correcto");
      //this.vehiculoService.paginaReactiva.next(true); 
      //this.router.navigate(['/vehiculo']);

      /*const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(data.access_token);
        console.log(decodedToken);*/

      sessionStorage.setItem(environment.TOKEN, data.access_token);
      this.recargarService.paginaReactiva.next(true);
      this.router.navigate(['']);
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
