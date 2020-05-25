import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.models';
import { MedicoService } from 'src/app/services/medico/medico.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[]= [];

  cargando: boolean= true;

  totalRegistros: number= 0;

  desde: number= 0;


  constructor(public medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando= true;
    this.medicoService.cargarMedicos(this.desde)
        .subscribe((res: any)=>{
          console.log(res);
          this.totalRegistros= res.total;
          this.medicos= res.medico;
          this.cargando= false;
        })
  }

  buscarMedico(termino: string){
    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }

    this.cargando = true;


    this.medicoService.buscarMedico(termino)
        .subscribe((medicos : Medico[]) =>{
          console.log(medicos);
          this.medicos= medicos;
          this.cargando=false;
        })
  }

  borrarMedico(medico: Medico){
    this.medicoService.borrarMedico(medico._id)
        .subscribe(res=> {
          //console.log(res);
          this.cargarMedicos();

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
        this.cargarMedicos();
    
      }
}
