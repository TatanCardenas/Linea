import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/_service/progress.service';
import { LoginService } from './_service/login.service';
import { VehiculoService } from './_service/vehiculo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public flagProgressBar: boolean = true;
  public flagSesion: boolean = false;
  constructor(private progressService: ProgressService,
              private loginService: LoginService,
              private vehiculoService: VehiculoService){
                this.vehiculoService.recargarPagina;
                this.logeo();
                
  }

  ngOnInit(): void {
    this.progressService.progressBarReactiva.subscribe(data => {
      this.flagProgressBar = data;
      //this.flagProgressBar = !this.flagProgressBar;
      //this.logeo();
    });
  }

  logeo(){
    this.flagSesion = this.loginService.estaLogueado();
    console.log(this.flagSesion);
  }

  cerrarSession(){
    this.loginService.cerrarSesion();
  }

}


