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
import { AgregarVComponent } from './pages/vehiculo/agregar-v/agregar-v.component';
import { EditarVComponent } from './pages/vehiculo/editar-v/editar-v.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';


const routes: Routes = [
  {path: '', component: EditarComponent},
  {path: 'buscar', component: BuscarComponent},
  {path: 'ingresar', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'editar', component: EditarComponent},
  {path: 'departamento', component: DepartamentoComponent, children:[
    {path: 'ciudad/:idDep', component: CiudadComponent}
  ]},
  {path: 'vehiculo', component: VehiculoComponent, children:[
    {path: 'datosv/:idV', component: EditarVComponent},
    {path: 'agregar', component: AgregarVComponent}
  ]},
  {path: 'error', component: PageErrorComponent},
  {path: 'sinacceso', component: NoAutorizadoComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
