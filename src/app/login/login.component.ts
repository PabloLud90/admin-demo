import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';

declare function init_plugins();
//libreria google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean=false;
  email: string;

  auth2: any;

  constructor( public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit(): void {

    init_plugins();
    this.googleInit();

    this.email= localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame= true;
    }
  }

  //inicializacion del plugin de google-sigIn
  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2= gapi.auth2.init({
          cliente_id: '333657084200-qre0k4k9h984lq2ab4uug58jjrg424kq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origiin',
          scope: 'profile email'

      });

      this.attachSignIn(document.getElementById('btnGoogle'));


    });
  }


  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) =>{
      //let profile= googleUser.getBasicProfile(); ==> profile me devuelve todos los datos del objeto
      let token= googleUser.getAuthResponse().id_token;
      
      this.usuarioService.loginGoogle(token)
            .subscribe( ()=> window.location.href= '#/dashboard'); //==> redireccion manual problema de no cargar correctamente el angular
          // .subscribe(res=>{
          //   console.log(res);
          //   this.router.navigate(['/dashboard']);

          // });
      //console.log(token);

    });
  }

  //parte del login
  ingresar(forma: NgForm){
    //forma.valid veridi=fica so=i el formulario es valido
    if(forma.invalid){ 
        return;
    }
    //la forma.value contiene la informacion del usuario
    let usuario= new Usuario(null,  forma.value.email, forma.value.password);    
    
    this.usuarioService.loginUsuario(usuario, forma.value.recuerdame)
              .subscribe(correcto=> this.router.navigate(['/dashboard']));
            // .subscribe(res =>{
            //   console.log(res);
            //   this.router.navigate(['/dashboard']);
            // });
  }

}
