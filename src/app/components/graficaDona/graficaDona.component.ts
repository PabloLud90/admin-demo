import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficaDona',
  templateUrl: './graficaDona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {
  @Input('chartLabels') public doughnutChartLabels: string[] = [];
  @Input('chartData') public doughnutChartData: number[] = [];
  @Input('chartType') public doughnutChartType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

