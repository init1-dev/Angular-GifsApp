import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'Wv4yr5OXKVpUZ3WWJLls2U9MIMQP4mX4';
  private _limit: number = 10;
  private _historial: string[] = [];

  public resultados: any[] = [];
  
  get historial() {
    return [...this._historial];
  }

  get apiKey() {
    return this._apiKey;
  }

  get limit() {
    return this._limit;
  }

  constructor( private http: HttpClient ) {}

  biggerThan( data: string[] ):boolean {
    return ( data.length >= this.limit ) ? true : false;
  }

  buscarGifs( query: string ) {
    query = query.trim().toLowerCase();
    if ( query.length > 0 && !this._historial.includes( query ) ) {
      if(this.biggerThan(this._historial)){
        this._historial.pop();
        this._historial.unshift( query );
      } else {
        this._historial.unshift( query );
      }
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=${ this.limit }`)
        .subscribe( (resp: any) => {
          console.log( resp.data );
          this.resultados = resp.data;
        })
  }

}
