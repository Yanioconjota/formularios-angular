import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb:FormBuilder) {
    this.crearFormulario();
    this.cargarFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
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

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValida() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  crearFormulario(){
    //fb o FormBuilder arma el formulario en el componente
    this.forma = this.fb.group({
      //1 arg = value, 2 = validador síncrono
      nombre:    ['', [ Validators.required, Validators.minLength(3) ]],
      apellido:  ['', [ Validators.required, Validators.minLength(3) ]],
      email:     ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad:   ['', Validators.required],
      }),
      pasatiempos: this.fb.array([
        
      ])
    });
  }

  cargarFormulario(){
    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Sheev',
      apellido: 'Palpatine',
      email: 'iamthesenate@sith.com',
      direccion: {
        distrito: 'Naboo',
        ciudad: 'Quilmes'
      }
    });
    ['Política', 'Leyes', 'Estudio de Holocrones'].forEach(
      valor => this.pasatiempos.push(this.fb.control(valor))
    );
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('') );
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values( this.forma.controls ).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach( control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    //Después del posteo del formulario, lo reseteamos
    //this.forma.reset();
    //El método reset no borra el formulario, reinicia su estado y puede asignar los valores indicados, el resto los llenaría en null sin considerarlo un error.
    this.forma.reset({
      nombre: 'Sheev',
      apellido: 'Palpatine',
      email: 'iamthesenate@sith.com'
    });
  }

  reset(){
    this.forma.reset();
  }

}
