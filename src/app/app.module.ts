import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EditarComponent } from './pages/editar/editar.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'src/app/_service/interceptor.service';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarVComponent } from './pages/vehiculo/agregar-v/agregar-v.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorInterceptorService } from './_share/error-interceptor.service';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { EditarVComponent } from './pages/vehiculo/editar-v/editar-v.component';
import { NoAutorizadoComponent } from './pages/no-autorizado/no-autorizado.component';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { EditarUComponent } from './pages/usuario/editar-u/editar-u.component';
import { AgregarUComponent } from './pages/usuario/agregar-u/agregar-u.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { EliminarDialogComponent } from './pages/usuario/eliminar-dialog/eliminar-dialog.component';
import { AsociacionComponent } from './pages/asociacion/asociacion.component';
import { AsociarDialogComponent } from './pages/asociacion/asociar-dialog/asociar-dialog.component';
import { DesasociarDialogComponent } from './pages/asociacion/desasociar-dialog/desasociar-dialog.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN);
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BuscarComponent,
    EditarComponent,
    DepartamentoComponent,
    CiudadComponent,
    VehiculoComponent,
    AgregarVComponent,
    NotFoundComponent,
    PageErrorComponent,
    EditarVComponent,
    NoAutorizadoComponent,
    UsuarioComponent,
    EditarUComponent,
    AgregarUComponent,
    RutasComponent,
    PagosComponent,
    EliminarDialogComponent,
    AsociacionComponent,
    AsociarDialogComponent,
    DesasociarDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['159.223.107.103:8080'],
        disallowedRoutes: ['http://159.223.107.103:8080/movitapp-backend/oauth/token'],
      },
    }),
  ],
  providers: [
    [BnNgIdleService],
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
  ],
  entryComponents: [
    EliminarDialogComponent,
    AsociarDialogComponent,
    DesasociarDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
