import {Routes, RouterModule} from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const appRoutes: Routes=[
    {
        path: '',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children:[
            {
            path: '',
            redirectTo: '/dashboard',
            pathMatch: 'full'
            },
            {
                path: 'dashboard', 
                component: DashboardComponent,
                data:{titulo: 'Dashboard'}
            },
            {
                path:'progress',
                component: ProgressComponent,
                data:{titulo: 'Progress'}
            },
            {
                path:'graficas1',
                component: Graficas1Component,
                data:{titulo: 'Graficas'}
            },
            {
                path: 'promesas',
               component: PromesasComponent,
               data:{titulo: 'Promesas'}
            },

            {
                path: 'rxjs',
               component: RxjsComponent,
               data:{titulo: 'RxJs'}
            },
            {
                path:'perfil',
                component: ProfileComponent,
                data:{titulo: 'Perfil del Tema'}
            },
            {
                path:'busqueda/:termino',
                component: BusquedaComponent,
                data:{titulo: 'Buscador'}
            },

            //Mantenimiento
            {
                
                path:'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data:{titulo: 'Mantenimiento De Usuarios'}
            },

            {
                path:'hospitales',
                component: HospitalesComponent,
                data:{titulo: 'Mantenimiento De Hospitales'}
            },

            {
                path:'medicos',
                component: MedicosComponent,
                data:{titulo: 'Mantenimiento De Médicos'}
            },
            {
                path:'medico/:id',
                component: MedicoComponent,
                data:{titulo: 'Actualizar médico'}
            },
           
            {
                path:'account-setting',
                component: AccoutSettingsComponent,
                data:{titulo: 'Ajustes del tema'}
            }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forChild(appRoutes);  
