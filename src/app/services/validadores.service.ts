import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  //recibe como argumento el control del formulario a validar
  //devuelve un objeto con un booleano
  usuarioBanneado( control: FormControl ): {[s:string]: boolean} {
    //valida el valor del input con el mail baneado
    //El signo de interrogación se agrega para evitar que de error si no hay un value
    if (control.value?.toLowerCase() === 'lukeskywalker@gmail.com') {
      return {
        baneado: true
      }
    }
    return null;
  }

}
