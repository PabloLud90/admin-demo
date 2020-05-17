import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo: string;   //medico, usuario, hospital
  public id: string;      //medico, usuario, hospital

  public oculto: string='oculto';     //modal

  public notificacion = new EventEmitter<any>();      //Emitir algo q los otros componentes puedan escuchar cuando se sube una imagen
                                                      //any  objeto respuesta del servcio de carga de imagenes

  constructor() { 
  }

  ocultarModal(){
    this.oculto='oculto';
    this.tipo= null;
    this.id= null;

  }

  mostrarModal(tipo: string, id: string){
    this.oculto='';

    this.id= id;
    this.tipo= tipo;

  }
}
