import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/_service/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public flagProgressBar: boolean = true;

  constructor(private progressService: ProgressService){
    
  }

  ngOnInit(): void {
    this.progressService.progressBarReactiva.subscribe(data => {
      //this.flagProgressBar = data;
      this.flagProgressBar = !this.flagProgressBar;
    });
  }

}


