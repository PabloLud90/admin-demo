import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemporal: string;

  constructor(public usuarioService: UsuarioService) { 
    this.usuario= this.usuarioService.usuario;

  }

  ngOnInit(): void {
  }

  guardar(usuario:Usuario){
    this.usuario.nombre= usuario.nombre;
    if(!this.usuario.es_usuario_google){
    this.usuario.email= usuario.email
    }


    this.usuarioService.actualizarUsuario(this.usuario)
        .subscribe(res=>{
          console.log(res);
        })
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

  //2. Cambiar imagen el metodo se encuentra en usuarioService
  actualizarImagen(){
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }


}
