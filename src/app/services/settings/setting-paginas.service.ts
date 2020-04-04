import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingPaginasService {

  ajustes: Ajustes={
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }


  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  guardarAjustes(){
    //guardado en el local storage
    console.log('Guardando valores del localstorage')
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    //cargado de ajustes de local storage
    console.log('Caargando valores del localstorage')

    if(localStorage.getItem('ajustes')){
      this.ajustes= JSON.parse(localStorage.getItem('ajustes'));
      console.log('Caargando valores del localstorage')
      this.aplicarTema(this.ajustes.tema);
    }else{
      console.log('Usando valores por defecto');
    }
  }

  aplicarTema(tema: string){

    let url= `assets/css/colors/${tema}.css`
    this._document.getElementById('tema').setAttribute('href',  url)

    this.ajustes.tema= tema;
    this.ajustes.temaUrl= url;

    this.guardarAjustes();

  }


}


interface Ajustes{
  temaUrl: string;
  tema: string;
}
