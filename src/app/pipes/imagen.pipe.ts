import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(img: string, tipo: string= 'usuario'): any {
    let url = URL_SERVICES + '/img';

    //sino viene img ponemos x defult el no-img del BE
    if(!img){
      return url + '/usuarios/123456';
    }

     //verificar si viene la imagen de google
    if(img.indexOf('https')>=0){
      return img;
    }

    //subir img personalizada
    switch (tipo){
      case ('usuario'):
        url += '/usuarios/'+ img;
        break;
        case ('medico'):
        url += '/medicos/'+ img;
        break;
        case ('hospital'):
        url += '/hospitales/'+ img;
        break;
        default:
          console.log('Tipo no existe, los tipos son usuario,medico, hospital');
        url+= '/usuarios/123456';
    }
    return url;
  }

}
