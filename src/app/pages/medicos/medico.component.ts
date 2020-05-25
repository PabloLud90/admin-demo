import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.models';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Medico } from 'src/app/models/medico.models';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[]= [];
  medico: Medico= new Medico('','','','','');
  hospital: Hospital= new Hospital('');

  constructor(public hospitalService: HospitalService, 
              public medicoService: MedicoService, 
              public router: Router,
              public activatedRouter: ActivatedRoute,
              public modalUploadService: ModalUploadService) { 

                activatedRouter.params.subscribe(params => {
                  let id= params['id'];

                  if(id !== 'nuevo'){
                    this.obtenerMedico(id);
                  }
                })
              }

  ngOnInit(): void {
    this.hospitalService.cargarHospitals()
        .subscribe(res => this.hospitales= res);
        console.log(this.hospitales);

        this.modalUploadService.notificacion
        .subscribe(()=> this.obtenerMedico(this.medico._id));
        //this.medico.img= res.medico.img;
        
  }

  //ESTE METODO LO UTILIZAREMOS TANTO PARA CREAR O ACTUALIZAR UN MEDICO
  guardarMedico(f: NgForm){
    console.log("valid",f.valid);
    console.log("valor", f.value)

    if(f.invalid){
      return;
    }

    this.medicoService.crearMedico(this.medico)
        .subscribe(medico => {
          this.medico._id= medico._id;
          this.router.navigate(['/medico', medico._id]);
        });
  }

  //cargar medico por ID
  obtenerMedico(id: string){

    this.medicoService.obtenerMedico(id)
        .subscribe(res => {
          this.medico= res
          this.medico.hospital= res.hospital._id;
          this.obtenerHospitalId(this.medico.hospital);
        })

  }

  //cargar imagen del hospital al seleccioanr del select
  obtenerHospitalId(id: string){
    this.hospitalService.obtenerHospital(id)
        .subscribe(res => {
          this.hospital= res
        });

  }

  //cambiar foto medico
  cambiarFoto(medico: Medico){
    this.modalUploadService.mostrarModal('medicos', this.medico._id);

  }
}
