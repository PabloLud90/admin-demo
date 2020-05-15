import {Routes, RouterModule} from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficaDonaComponent } from '../components/graficaDona/graficaDona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';

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
                path:'account-setting',
                component: AccoutSettingsComponent,
                data:{titulo: 'Ajustes del tema'}
            }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forChild(appRoutes);  
