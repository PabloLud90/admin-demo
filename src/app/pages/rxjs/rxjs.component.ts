import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription: Subscription;

  constructor() { 

  
    //escucha /callbac
    this.subscription= this.regresaObservable()
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('error', error),
      () => console.log('El observador termino')
    );



  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    console.log('la pagina se va cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable( (observer: Subscriber<any>)=>{
      let cont= 0;

      let intervalo= setInterval(() =>{
        cont += 1;

        const salida= {
          valor: cont
        };

        observer.next(salida);

        //para usar unscribe
        // if (cont === 3){

        //   clearInterval(intervalo);
        //   observer.complete();
        // }


        ///Para usar el filter se comento
        // if(cont === 2){
        //   //clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index)=>{
        //console.log(valor, index);

        if( (valor % 2) === 1 ){
          //impar
          return true;
        }else{
          //par
          return false;
        }
      })
    );
  }

}
