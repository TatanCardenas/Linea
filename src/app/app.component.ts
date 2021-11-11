import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/_service/progress.service';
import { LoginService } from './_service/login.service';
import { VehiculoService } from './_service/vehiculo.service';
import { RecargarService } from './_service/recargar.service';
import { MatIconModule } from '@angular/material/icon';
import { BnNgIdleService } from 'bn-ng-idle';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public flagProgressBar: boolean = true;
  public flagSesion: boolean = false;
  public rol: string;
  public rolSesion: number;

  constructor(private progressService: ProgressService,
    private loginService: LoginService,
    private recargarService: RecargarService,
    private bnIdle: BnNgIdleService) {
  }

  ngOnInit(): void {
    this.logeo();
    this.recargarService.paginaReactiva.subscribe(data => {
      this.logeo();
    });

    this.recargarService.rolUsuario.subscribe(data => {
      this.logeo();
    });

    this.progressService.progressBarReactiva.subscribe(data => {
      this.flagProgressBar = data;

    });

    this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        if(this.loginService.estaLogueado()==true){
          alert("Tiempo expirado");
          console.log('session expired');
          this.cerrarSession();
        }
        
      }
    });

  }

  logeo() {
    this.flagSesion = this.loginService.estaLogueado();

    console.log(this.flagSesion);
    if(this.flagSesion == true){
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN);
      const decodedToken = helper.decodeToken(token);
      const rol: string = decodedToken.authorities[0];
      if(rol == "Administrador"){
        this.rolSesion = 1; 
      }else{
        if(rol == "Conductor"){
          this.rolSesion = 2;
        }
      }
      console.log(rol);
    }
  }

  cerrarSession() {
    this.loginService.cerrarSesion();
  }

}


