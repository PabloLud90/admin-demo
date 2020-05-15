import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UsuarioService, SettingPaginasService, SidebarService, SharedService, SubirArchivoService} from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingPaginasService, 
    SidebarService, 
    SharedService,
    UsuarioService,
    SubirArchivoService
  ]
})
export class ServiceModule { }
