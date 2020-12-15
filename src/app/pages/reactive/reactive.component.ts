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

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
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
    if (this.forma.invalid) {
      console.log(this.forma.value);
      console.log('debes llenar el formulario correctamente!');
      this.forma.markAllAsTouched();
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
  }

}
