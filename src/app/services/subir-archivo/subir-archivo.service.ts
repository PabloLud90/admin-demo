import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: string, id: string ) {

    //esto es una promesa
    return new Promise( (resolve, reject ) => {  //Promise permite notificar a las otras pantallas que esto termino

      let formData = new FormData;  //formData es el payload que quiero enviar a subir x ajax esto es js puro
      let xhr = new XMLHttpRequest();  // inicializacion de la peticion ajax

      //configuracion formData
      formData.append( 'imagen', archivo, archivo.name );

      // configurar peticion ajax
      xhr.onreadystatechange = function() { 

        //esto va a ser como un observable que esta ejecutandose
        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      //El lugar a donde voy a realizar la peticion
      let url = URL_SERVICES + '/upload/' + tipo + '/' + id;

      //tipo de peticion para la actualizacion
      xhr.open('PUT', url, true );
      xhr.send( formData );

    });

  }


}
