import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  usuario: Usuario;


  

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit(): void {
    this.usuario= this.usuarioService.usuario;
    

  }


  buscar(termino: string){
    this.router.navigate(['/busqueda', termino]);

  }

}
