import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
//sweetalert
import swal from "sweetalert";
//import * as swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  sonIguales(campo1: string, campo2: string){
    return (group: FormGroup)=>{
      let pass1= group.controls[campo1].value;
      let pass2= group.controls[campo2].value;

      if(pass1 === pass2){
        return null;

      }
      return{
        sonIguales: true
      };
    }
  }

  ngOnInit(){
    init_plugins();

    this.forma=  new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      //caja checbox
      condiciones: new FormControl(false)
      //validacion de contrasenias
    }, {validators: this.sonIguales('password', 'password2')});

    this.forma.setValue({
      nombre: 'Pablo',
      correo: 'test@test.com',
      password: 123456,
      password2: 123456,
      condiciones: true
    })
  }

  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }
    if(!this.forma.value.condiciones){
     swal("Importante", "Debe aceptar las condiciones", "warning");
      //console.log('Debe aceptar las condiciones');
      return;
    }

    let usuario= new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario)
          .subscribe(res =>{
            console.log(res);
            //para navigar al login despues dellenar el formulario
            swal('Usuario Creado', usuario.email, 'success');
            this.router.navigate(['login']);
            //otra forma de realizarlo =====> .subscribe(res=>this.router.navigate(['login']));
          });
  }

}
