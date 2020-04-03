import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progreso1: number=50;
  progreso2: number=30;


  constructor() { }

  ngOnInit(): void {
  }

  // actualizarProgress(event: number){
  //   console.log(event);
  //   this.progreso1= event;
  //   //this.progreso2= event;
  // }

}
