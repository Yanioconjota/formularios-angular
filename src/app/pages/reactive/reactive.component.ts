import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb:FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      //1 arg = value, 2 = validador síncrono
      nombre:   ['', [ Validators.required, Validators.minLength(3) ]],
      apellido: ['', [ Validators.required, Validators.minLength(3) ]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]]
    });
   //     nombre:   ['Sheev', [ Validators.required, Validators.minLength(3) ]],
   //     apellido: ['Palpatine', [ Validators.required, Validators.minLength(3) ]],
   //     email:    ['iamthesenate@sith.com', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]]
   //   });
  }

  guardar(){
    console.log(this.forma);
  }

}
