import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemporal: string;


  constructor(public subirArchivoService: SubirArchivoService,  public modalUploadService: ModalUploadService) {
   }

  ngOnInit(): void {
  }


  cerrarModal(){
    this.imagenTemporal= null;
    this.imagenSubir= null;
    //llamo el servico ocultarModal
    this.modalUploadService.ocultarModal();

  }

   //1. Seleccionar imagen 
   seleccionImagen(archivo: File){
    if (!archivo){
      this.imagenSubir= null;
      return;
    }

    //type es una propiedad del target
    if(archivo.type.indexOf('image') < 0){
      swal('Solo imagenes', 'El arcivo seleccionado no es una imagen', 'error');
      this.imagenSubir= null;
      return;
    }


    this.imagenSubir= archivo;

    let reader= new FileReader();  //
    let urlImagenTemp= reader.readAsDataURL(archivo); // creamos temporal para dar una vista previa de la img

    reader.onloadend = ()=> {  
     // console.log(reader.result) //obtien imagen en base 64
      this.imagenTemporal = Object(reader.result);
    
    }
  }

  subirImagen(){
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
        .then(res=>{
         // console.log(res);
          this.modalUploadService.notificacion.emit(res);
          this.cerrarModal();

        })
        .catch(err =>{
          console.log('Error en la carga');

        })
   

  }

}
