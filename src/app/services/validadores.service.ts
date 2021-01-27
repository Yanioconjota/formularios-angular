import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    //Se agrega esta validación para que el método solo evalúe si existe usuario y no si existe un valor en el input.
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        if (control.value === 'yanioconjota') {
          resolve({existe: true});
        } else {
          resolve(null);
        }
      }, 1500);
    })
  }

  //recibe como argumento el control del formulario a validar
  //devuelve un objeto con un booleano
  usuarioBanneado( control: FormControl ): ErrorValidate {
    //valida el valor del input con el mail baneado
    //El signo de interrogación se agrega para evitar que de error si no hay un value
    if (control.value?.toLowerCase() === 'lukeskywalker@gmail.com') {
      return {
        baneado: true
      }
    }
    return null;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }
}
