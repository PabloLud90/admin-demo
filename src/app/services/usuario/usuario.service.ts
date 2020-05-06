import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  

  constructor(public http: HttpClient, public router: Router){
    this.cargarStorage();
   }

   //Verificar si esta logeado usar token ===> proteger las rutas
   estaLogeado(){
     return(this.token.length>5) ? true: false;

   }

   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token= localStorage.getItem('token');
       this.usuario= JSON.parse(localStorage.getItem('usuario'));
     }else{
       this.token= '';
       this.usuario= null;
     }
   }

   //Login usuario con Google (token)
   guardarStorage(id: string, token: string, usuario:Usuario){
    localStorage.setItem("id ==>", id);
    localStorage.setItem("token ==>", token);
    localStorage.setItem("usuario ==>", JSON.stringify(usuario)); 

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
     this.router.navigate(['/login']);
   }
   
   loginGoogle(token: string){
     let url= URL_SERVICES + '/login/google';

     return this.http.post(url, {token:token})
           .pipe(map((res: any)=>{
             this.guardarStorage(res.id, res.token, res);
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
     return this.http.post(url, usuario);
    //  ,map((res: any) =>{
        swal('Usuario Creado', usuario.email, 'success');
    //   return res.usuario;
    // })
   }

}
