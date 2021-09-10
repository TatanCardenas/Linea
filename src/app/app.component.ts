import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'lineaI';
  public bad = 'Prueba 100';
  numero1 : number;
  numero2 : number;
  resultado: number;

  public operar(op: string): void{
    
    switch(op){
      case 's':
        this.resultado = this.numero1 + this.numero2;
        break;
      case 'r':
        this.resultado = this.numero1 - this.numero2;
        break;
      case 'm':
        this.resultado = this.numero1 * this.numero2;
        break;
      case 'd':
        this.resultado = this.numero1 / this.numero2;
        break; 
    }
  }
}
