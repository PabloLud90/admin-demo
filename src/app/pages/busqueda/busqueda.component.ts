import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[]= [];
  hospitales: Hospital[]= [];
  medicos: Medico[]= [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
  //recibe el parametro por el url activatedRoute
    activatedRoute.params
    .subscribe(params =>{
      let termino= params['termino']; // termino = al de pagesRoutes de la BusquedaComponent
      console.log(termino);
      this.buscar(termino);
    })
   }

  ngOnInit(): void {
  }


      buscar(termino: string){
        let url= URL_SERVICES + '/busqueda/todo/'+ termino;

        this.http.get(url)
            .subscribe((res: any)=>{
              console.log(res);
              this.hospitales= res.hospitales;
              this.medicos= res.medicos;
              this.usuarios= res.usuarios;
            })

      }

  

}
