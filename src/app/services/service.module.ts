import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SettingPaginasService, SidebarService, SharedService} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SettingPaginasService, 
    SidebarService, 
    SharedService
  ]
})
export class ServiceModule { }
