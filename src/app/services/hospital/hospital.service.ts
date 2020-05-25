import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.models';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital

  totalHospitales: number=0;

  constructor(public http: HttpClient, 
              public usuarioService: UsuarioService, 
              public router: Router, 
             ) { }

  //CARGAR HOSPITALES (OBTENER CON PAGINACION)
  cargarHospitales(desde: number=0){
    let url= URL_SERVICES + '/hospital?desde=' + desde;
    return this.http.get(url)
  }

   //otra forma de obtener los hospitales sin paginacion
   cargarHospitals(){
    let url= URL_SERVICES + '/hospital';

    return this.http.get(url)
          .pipe(map((res: any)=>{
            this.totalHospitales= res.total;
            return res.hospital;

          }))
  }

  //OBTENER UN HOSPITAL
  obtenerHospital(id: string){

    let url= URL_SERVICES + '/hospital/' + id;

    return this.http.get(url)
          .pipe(map((res: any)=> 
            res.hospital
          ));
  }

  //CREAR HOSPITAL
  crearHospital(nombre: string){
    let url= URL_SERVICES + '/hospital';
    url += '?token=' + this.usuarioService.token;

    return this.http.post(url, {nombre: nombre})
          .pipe(map((res: any)=> res.hospital));
  }


  //ACTUALIZAR HOSPITAL
  actualizarHospital(hospital: Hospital){

    let url= URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, hospital)
          .pipe(map((res: any)=> {
            swal('Hospital actualizado', hospital.nombre,'success')
            return res.hospital
          }));
  }

  //BUSCAR HOSPITAL
  buscarHospital(termino: string){
    let url= URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
        .pipe(map((res: any) => res.hospitales));
  }

  // ====> BORRAR HOSPITAL
  borrarHospital(id: string){
    let url= URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
          .pipe(map(res =>{
            swal('Hospital borrado','El hospital se borro correctamente','success');
          }))
  }

  // OTRA FORMA DE BORRAR HOSPITAL
  borrarH(id: string){

    let url= URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
          .pipe(map(res => 
            swal('Hospital borrado','El hospital se borro correctamente','success')
            ));
  }
}

