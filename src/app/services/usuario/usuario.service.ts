import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  

  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService){
      this.cargarStorage();
   }

   //Verificar si esta logeado usar token ===> proteger las rutas
   estaLogeado(){
     return(this.token.length > 5) ? true : false;

   }

   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token= localStorage.getItem('token');
       this.usuario= JSON.parse(localStorage.getItem('usuario'));
       console.log('cargando token', this.token);
     }else{
       this.token= '';
       this.usuario= null;
     }
   }

   //Login usuario con Google (token)
   guardarStorage(id: string, token: string, usuario:Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario)); 

    this.usuario= usuario;
    this.token= token;
   }

   //Validar el logout del header y del sidebar
   logout(){
     this.usuario= null;
     this.token= '';
     //eliminar del localStorage
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');

     //navegar al login
     this.router.navigate(['/login'])


   }
   
   loginGoogle(token: string){
     let url= URL_SERVICES + '/login/google';

     return this.http.post(url, {token:token})
           .pipe(map((res: any)=>{
             this.guardarStorage(res.id, res.token, res.usuario);
             return true;
           }));

   }


   // Login Usuario normal
   loginUsuario(usuario: Usuario, recordar: boolean= false){
    if (recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
     let url= URL_SERVICES +'/login';

     return this.http.post(url, usuario)
              .pipe(map((res: any)=>{
               //console.log(JSON.stringify(res));
              // localStorage.setItem("id ==>", res.id);
              // localStorage.setItem("token ==>", res.token);
              // localStorage.setItem("usuario ==>", JSON.stringify(res)); 
             this.guardarStorage(res.id, res.token, res.usuario);

              return true;
             }))     
   }
  

   //Crear usuario
   crearUsuario(usuario: Usuario){
     //1. url del postman=> localhost:3000/usuario
     let url= URL_SERVICES + '/usuario';
     //crear alerta de 
     return this.http.post(url, usuario)
       .pipe(map((res: any)=>{
         swal('Usuario Creado', usuario.email, 'success');
         return JSON.stringify(res.usuario);
       }));
   }

   //Actualizar Usuario
   actualizarUsuario(usuario: Usuario){

   let url= URL_SERVICES + '/usuario/' + usuario._id;
   url += '?token=' + this.token;

   console.log(url);

   return this.http.put(url, usuario)
       .pipe(map((res:any)=>{

        //this.usuario= res.usuario
        this.guardarStorage(res.usuario._id, this.token, res.usuario);
        swal('Usuario Actualizado', usuario.nombre, 'success');
        console.log('usuario actualizado')

       return true;
       }));
   }

   cambiarImagen(archivo: File, id: string){
     this.subirArchivoService.subirArchivo(archivo,'usuarios', id)
         .then((res: any) =>{
           //console.log(res);
           this.usuario.img= res.usuario.img;
           swal('Imagen Actualizado', this.usuario.nombre, 'success');
           this.guardarStorage(id, this.token, this.usuario);
         })
         .catch(res =>{
          console.log(res);

         });
   }

   cargarUsuarios(desde: number=0){
     let url= URL_SERVICES + '/usuario?desde=' + desde;
     return this.http.get(url);
   }

   //Buscar usuario
   buscarUsuario(termino: string){
     let url= URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;

     return this.http.get(url)
            .pipe(map((res: any)=> res.usuarios));
   }

   borrarUsuario(id: string){
     let url= URL_SERVICES + '/usuario/' + id;
     url += '?token=' + this.token;

     return this.http.delete(url)
         .pipe(map(res=>{
           swal('Usuario borrado', 'El usuario se elimino correctamente', 'success');
           return true;
         }));
      

   }

  //actualizarRole
   actualizarRol(usuario: Usuario){

    let url= URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
 
    console.log(url);
 
    return this.http.put(url, usuario)
        .pipe(map((res:any)=>{

          if(usuario._id === this.usuario._id){

            this.guardarStorage(res.usuario._id, this.token, res.usuario);

          }
 
         swal('Usuario Actualizado', usuario.nombre, 'success');
        return true;
        }));
    }
}
