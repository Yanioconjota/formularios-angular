import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  
  // usuario = {
  //   nombre: '',
  //   apellido: '',
  //   email: '',
  //   pais: '',
  //   genero: ''
  // };

  usuario = {
    nombre: 'Sheev',
    apellido: 'Palpatine',
    email: 'iamthesenate@sith.com',
    pais: 'ARG',
    genero: 'M'
  };

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe( paises => {
        console.log(paises);
        this.paises = paises;
        this.paises.unshift({
          nombre: 'Seleccione un país',
          codigo: ''
        });
      });
  }

  guardar(forma: NgForm){
    console.log(forma);
    if (forma.invalid) {
      console.log(forma.value);
      console.log('debes llenar el formulario correctamente!');
      Object.values( forma.controls ).forEach( control => {
        control.markAllAsTouched();
        
      });
      return;
    } else {
      console.log(forma.value);
      console.log('datos enviados satisfactoriamente!');
    }
  }

}
