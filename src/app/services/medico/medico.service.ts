import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.models';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { HospitalService } from '../hospital/hospital.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {


  constructor(public http: HttpClient, 
              public usuarioService: UsuarioService, 
              public hospitalService: HospitalService,
              public router: Router
) { }


  cargarMedicos(desde: number=0){
    let url= URL_SERVICES + '/medico?desde=' + desde;
    return this.http.get(url);
  }

  buscarMedico(termino: string){
    let url= URL_SERVICES + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
        .pipe(map((res: any)=> res.medicos))


  }

  //ESTE METODO LO UTILIZAREMOS TANTO PARA CREAR O ACTUALIZAR UN MEDICO
  crearMedico(medico: Medico){

    let url= URL_SERVICES + '/medico';

    if( medico._id ){
      //actualizando
      url+= '/' + medico._id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put(url, medico)
          .pipe(map((res: any) =>{
            swal('Medico Actualizado', medico.nombre, 'success');
            return res.medico;
          }));
    }else{
      //creando

    url += '?token=' + this.usuarioService.token;

    return this.http.post(url, medico)
        .pipe(map((res: any)=> {
          swal('Medico Creado', medico.nombre, 'success');
          return res.medico;

        }))

  }

}

  borrarMedico(id: string){
    let url= URL_SERVICES + '/medico/' + id;
    url += '?token=' + this.usuarioService.token

    return this.http.delete(url)
          .pipe(map(res => swal('Medico Borrado', 'Medico Borrado Correctamente', 'success')))

  }

  actualizarMedico(medico: Medico){

    let url= URL_SERVICES + '/medico/' + this.hospitalService.hospital._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, medico);

  }

  obtenerHospital(id: string){

    this.hospitalService.obtenerHospital(id)
        .subscribe(res => res.hospital)
  }

  //Obtener medico x ID
  obtenerMedico(id: string){
    let url= URL_SERVICES + '/medico/' + id

    return this.http.get(url)
        .pipe(map((res: any)=> res.medico))

  }





}
