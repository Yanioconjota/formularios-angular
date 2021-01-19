import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb:FormBuilder,
              private validadores: ValidadoresService) {
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

  get usuarioBaneado() {
    //El signo de interrogación se agrega para evitar que de error si no hay un value
    return this.forma.get('email').errors?.baneado;
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
      //1 arg = value, 2 = validadores síncronos (En array si son mas de uno), 3 = validadores asíncronos
      nombre:    ['', [ Validators.required, Validators.minLength(3) ]],
      apellido:  ['', [ Validators.required, Validators.minLength(3) ]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), this.validadores.usuarioBanneado ]],
      //dirección es un objeto anidado dentro del formulario
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

  llenarFormulario() {
    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Sheev',
      apellido: 'Palpatine',
      email: 'iamthesenate@sith.com',
      direccion: {
        distrito: 'Naboo',
        ciudad: 'Quilmes'
      },
      pasatiempos: ['Política', 'Leyes', 'Estudio de Holocrones']
    });
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('') );
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    console.log(this.forma);
    console.log(this.usuarioBaneado);
    if (this.forma.invalid) {
      //Se itera con el obejeto forma para marcar todos los inputs como touched si el formulario es inválido
      return Object.values( this.forma.controls ).forEach( control => {
        //Si hay un objeto anidado preguntamos si ese control es una instancia de FormGroup, de ser así iteramos y marcamos cada uno de sus controles como touched
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
