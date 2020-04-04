import { Component } from '@angular/core';

import { SettingPaginasService } from './services/service.index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public settingPaginas: SettingPaginasService){

  }
}
