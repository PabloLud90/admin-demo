import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UsuarioService, SettingPaginasService, SidebarService, SharedService, SubirArchivoService} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuardGuard } from './guards/login-guard.guard';

ModalUploadService


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
    HospitalService,
    MedicoService,
    SubirArchivoService,
    ModalUploadService,
    AdminGuard,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
