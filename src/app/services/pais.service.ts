import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private http: HttpClient ) { }

  getPaises(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        //Este es el map que muta la información del get
        map( (resp:any[]) => {
          //Este map es el propio del array para traer el objeto que necesito
          return resp.map( pais => ({nombre: pais.name, codigo: pais.alpha3Code}));
        })
      )
  }
}
