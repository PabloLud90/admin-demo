import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';





import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        FormsModule
    ],

    declarations:[
        PagenotfoundComponent,    
        HeaderComponent,          
        SidebarComponent,         
        BreadcrumbsComponent,

    ],
    exports:[
        HeaderComponent,          
        SidebarComponent,         
        BreadcrumbsComponent,
        PagenotfoundComponent,   
    ]
})

export class SharedModule{}