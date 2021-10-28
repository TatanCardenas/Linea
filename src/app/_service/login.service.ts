import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecargarService } from './recargar.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/oauth/token`;
  constructor(private http: HttpClient,
              private router: Router,
              private recargarService: RecargarService) { }

  public login(usuario: string, password: string) {

    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(`${this.url}`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').
        set('Authorization', 'Basic ' + btoa(`${environment.TOKEN_AUTH_USERNAME}:${environment.TOKEN_AUTH_PASSWORD}`))
    });

  }

  public cerrarSesion() {
    const tk = sessionStorage.getItem(environment.TOKEN);
    this.http.get(`${environment.HOST}/cerrarSesion/anular/${tk}`).subscribe(data => {
      sessionStorage.clear();
      this.recargarService.paginaReactiva.next(true);
      this.router.navigate(['login']);
    });
  }

  public estaLogueado(): boolean {
    const tk = sessionStorage.getItem(environment.TOKEN);
    return tk != null;
  }
}
