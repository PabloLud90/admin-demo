import {Routes, RouterModule} from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficaDonaComponent } from '../components/graficaDona/graficaDona.component';

const appRoutes: Routes=[
    {
        path: '',
        component: PagesComponent,
        children:[
            {
            path: '',
            redirectTo: '/dashboard',
            pathMatch: 'full'
            },
            {
                path: 'dashboard', 
                component: DashboardComponent
            },
            {
                path:'progress',
                component: ProgressComponent
            },
            {
                path:'graficas1',
                component: Graficas1Component
            },
            {
                path:'GraficaDona',
                component: Graficas1Component
            }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forChild(appRoutes);  
