import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]= [];   //Esto es un arreglo de usuarios
  desde: number=0;

  totalRegistros: number= 0;

  //controlar la nimacion cargando
  cargando: boolean= true;

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    //para refrescar la pagina cuando se sube la imagen
    this.modalUploadService.notificacion
        .subscribe(res => this.cargarUsuarios());
  }

  //imagen de usuario component hacerla como boton
  mostrarModal(id: string){
    this.modalUploadService.mostrarModal('usuarios', id);

  }

  cargarUsuarios(){
    this.cargando= true //animacion cargando inicializa
    this.usuarioService.cargarUsuarios(this.desde)
        .subscribe((res: any)=>{
          //console.log(res);      //Esto entrega la data del usuario
          this.totalRegistros= res.total; //guarda en la variable el total de registros
          this.usuarios= res.usuarios; //guarda los usuarios para imprimirlos en la tabla
          this.cargando= false;   //animacion cargando stop
        })

  }

  //boton del html para cambiar
  cambiarDesde(valor: number){
    let desde= this.desde+ valor;

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde<0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  //para buscar usuarios
  buscarUsuario(termino:  string){
    //console.log(termino);
    //validacio de busqueda cuando se borra evitar el erro 402
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario(termino)
        .subscribe((usuarios: Usuario[])=> {
          this.usuarios= usuarios;
          this.cargando=false;
        })
  }


  borrarUsuario(usuario: Usuario){
    if (usuario._id === this.usuarioService.usuario._id){
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(borrar =>{

      if(borrar){
        this.usuarioService.borrarUsuario(usuario._id)
              .subscribe(res =>{
                console.log(res);
                this.cargarUsuarios();
              })

      }
    });
  }

  //guardarUsuario- actualiza rol
  guardarUsuario(usuario: Usuario){
    this.usuarioService.actualizarRol(usuario)
        .subscribe();

  }
}
