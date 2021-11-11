import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { EditarComponent } from './pages/editar/editar.component';
import { LoginComponent } from './pages/login/login.component';
import { NoAutorizadoComponent } from './pages/no-autorizado/no-autorizado.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { AgregarUComponent } from './pages/usuario/agregar-u/agregar-u.component';
import { EditarUComponent } from './pages/usuario/editar-u/editar-u.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AgregarVComponent } from './pages/vehiculo/agregar-v/agregar-v.component';
import { EditarVComponent } from './pages/vehiculo/editar-v/editar-v.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { GuardianService } from './_share/guardian.service'


const routes: Routes = [
  {path: '', component: EditarComponent},
  {path: 'buscar', component: BuscarComponent},
  {path: 'ingresar', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'editar', component: EditarComponent, canActivate: [GuardianService]},
  {path: 'departamento', component: DepartamentoComponent, children:[
    {path: 'ciudad/:idDep', component: CiudadComponent, canActivate: [GuardianService]}
  ], canActivate: [GuardianService]},
  {path: 'vehiculo', component: VehiculoComponent, children:[
    {path: 'datosv/:idV', component: EditarVComponent},
    {path: 'agregarv', component: AgregarVComponent},
  ], canActivate: [GuardianService]},
  {path: 'usuario', component: UsuarioComponent, children:[
    {path: 'datosc/:idConductor', component: EditarUComponent},
    {path: 'agregarc', component: AgregarUComponent},
  ], canActivate: [GuardianService]},
  {path: 'ruta', component: RutasComponent},
  {path: 'error', component: PageErrorComponent},
  {path: 'sinacceso', component: NoAutorizadoComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
