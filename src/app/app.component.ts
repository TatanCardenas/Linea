import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/_service/progress.service';
import { LoginService } from './_service/login.service';
import { VehiculoService } from './_service/vehiculo.service';
import { RecargarService } from './_service/recargar.service';
import { MatIconModule } from '@angular/material/icon';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public flagProgressBar: boolean = true;
  public flagSesion: boolean = false;
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
    this.progressService.progressBarReactiva.subscribe(data => {
      this.flagProgressBar = data;
      //this.flagProgressBar = !this.flagProgressBar;
      //this.logeo();
    });

    this.bnIdle.startWatching(5).subscribe((isTimedOut: boolean) => {
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
  }

  cerrarSession() {
    this.loginService.cerrarSesion();
  }

}


