import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudad } from 'src/app/_model/Ciudad';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  displayedColumnas: string[] = ['idDepartC', 'nombreC'];
  dataSourceC = new MatTableDataSource<Ciudad>();
  
  @ViewChild('PCiudad') CiudadPaginator: MatPaginator;
  
  constructor(private departamentoService: DepartamentoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{        //Obtener parametros que estan en le url
      let idDepartamento = params['idDep'];
      this.departamentoService.listarCiudad(idDepartamento).subscribe(ciudad =>{
        this.dataSourceC = new MatTableDataSource(ciudad);
        this.dataSourceC.paginator = this.CiudadPaginator;
        //this.flagCiudad = this.dataSourceC.data.length > 0 ? true:false;
      });
    });                      
  }
  private delay(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
