import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//RUTAS
import { APP_ROUTES } from './app.routes';

//Modulos {Los modulos dashboard, graficas, pagescompon, pagenotfo
//se delararaon en un archivo pages.modules.ts
//Los modulos Header, Sidebar, Bread se delararaon en un archivo shared.modules.ts
import {PagesModule} from '../app/pages/pages.module';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],

  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
