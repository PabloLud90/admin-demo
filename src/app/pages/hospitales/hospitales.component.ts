import { Component, OnInit, EventEmitter } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.models';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import swal from 'sweetalert';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[]= [];   //Esto es un arreglo de hospitales

  desde: number=0;

  totalRegistros: number= 0;

  //controlar la nimacion cargando
  cargando: boolean= true;

  //MODAL
  public tipo: string;
  public id: string;

  public oculto: string='oculto';

  //public notificacion= new EventEmitter<any>;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.modalUploadService.notificacion
        .subscribe(()=> this.cargarHospitales());

  }

  actualizarImagen(hospital: Hospital){
    this.modalUploadService.mostrarModal('hospitales', hospital._id);

  }

  cargarHospitales(){
    this.cargando= true;
    this.hospitalService.cargarHospitales(this.desde)
        .subscribe((res:any)=>{
          //console.log("====>",res);
          this.totalRegistros= res.total;
          this.hospitales= res.hospital;
          this.cargando= false;
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
      this.cargarHospitales();
  
    }

    //CREAR HOSPITAL
    crearHospital(hospital: Hospital){
      swal({
        title: 'Crear Hospital',
        text: 'Ingrese el nombre del hospital',
        content: 'input',
        icon: 'info',
        buttons: true,
        dangerMode: true
      }).then((valor: string) =>{
        if( !valor || valor.length === 0){
          return;
        }

        this.hospitalService.crearHospital(valor)
            .subscribe(res=>{
              console.log(res);
              this.cargarHospitales();
            })
       

      })
    }

    //Actualizar hospital
    guardarHospital(hospital: Hospital){
      this.hospitalService.actualizarHospital(hospital)
          .subscribe(res=>{
            this.cargarHospitales();
            console.log(res)
          })

    }

  
    //  BUSCAR HOSPITAL POR PAGINACION
    buscarHospital(termino: string){
      //console.log(termino);
      //validacio de busqueda cuando se borra evitar el erro 402
      if(termino.length <= 0){
        this.cargarHospitales();
        return;
      }
  
      this.cargando = true;

      this.hospitalService.buscarHospital(termino)
          .subscribe((hospitales: Hospital[])=>{
            this.hospitales= hospitales;
            this.cargando=false;
          })

    }
  
    //ELIMINAR HOSPITAL
    borrarHospital(hospital: Hospital){
      swal({
        title: 'Esta seguro?',
        text: 'Esta a punto de borrar a ' + hospital.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
      .then(borrar =>{
  
        if(borrar){
          this.hospitalService.borrarHospital(hospital._id)
                .subscribe(res =>{
                  //console.log(res);
                  this.cargarHospitales();
                })
  
        }
      });
    }

    //otra forma de borrar hospital
    borrarH(hospital: Hospital){
      this.hospitalService.borrarH(hospital._id)
          .subscribe( () => this.cargarHospitales())

    }

}
