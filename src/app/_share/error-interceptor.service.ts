import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProgressService } from '../_service/progress.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private progressService: ProgressService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error('Method not implemented.');
    //this.progressService.progressBarReactiva.next(true);
    return next.handle(req).pipe(retry(environment.REINTENTOS)).
      pipe(tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.error === true && event.body.errorMessage) {
            throw new Error(event.body.errorMessage);
          }/*else{
            this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
        }*/
        }
      })).pipe(catchError((err) => {
        console.log(err);
        console.log("err.error");
        console.log(err.error);
        if (err.error.status == 400) {
          if (err.error.message[0] == '-') {
            this.openSnackBar(err.error.message.slice(4));

          } 
          
          else {
            this.openSnackBar("Ocurrio un error, intente mas tarde")
          }

        } else if (err.status == 401) {
          if(err.error.error_description[0] == '-'){
            this.openSnackBar(err.error.error_description.slice(4));
          }/*else if(err.error.message == "No estas autorizado para acceder a este recurso"){
            this.openSnackBar(err.error.message);
          }*/
          
          else{
            this.router.navigate(['/sinacceso']);
          //this.openSnackBar(err.error.message);
          }   
        } else if (err.status == 400) {
          if(err.error.error_description == 'Bad credentials'){
            this.openSnackBar("Usuario o contraseña incorrecto");
          }
          //this.openSnackBar(err.error.message);
        }else if (err.error.status == 401) {
          this.router.navigate(['/sinaccesos']);
          //this.openSnackBar(err.error.message);
        } else if (err.error.status == 404) {
          this.router.navigate(['/error']);
          //this.openSnackBar(err.error.message);
        } else if (err.error.status == 405) {
          console.log(err.error.message);
          this.openSnackBar("Error, metodo no soportado");
        } else if (err.error.status == 415) {
          //this.openSnackBar(err.error.message);
          this.router.navigate(['/error']);
        } else if (err.error.status == 500) {
          this.router.navigate(['/error']);
        }else if (err.error == 40) {
          this.router.navigate(['/sinacceso']);
        } else {
          /*this.openSnackBar("Ocurrio un error inesperado, por favor contacte al proveedor.");
          this.router.navigate(['/error']);*/
        }

        return EMPTY;
      }));

  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


}
