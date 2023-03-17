import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = 'Wv4yr5OXKVpUZ3WWJLls2U9MIMQP4mX4';
  private _limit: number = 10;
  private _historial: string[] = [];
  
  public resultados: Gif[] = [];
  
  // GETTERS
  get historial() {
    return [...this._historial];
  }

  get servicioUrl() {
    return this._servicioUrl;
  }

  get apiKey() {
    return this._apiKey;
  }

  get limit() {
    return this._limit;
  }

  // SETTERS
  set setLimit( limit: number ) {
    this._limit = limit;
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this._limit = JSON.parse( localStorage.getItem('nResultados')! ) || 10;
    this.resultados = JSON.parse( localStorage.getItem('lastSearch')! ) || [];
  }

  biggerThan( data: string[] ):boolean {
    return ( data.length >= this.limit ) ? true : false;
  }

  // TODO: Almacenar en localStorage últimas 10 queries para evitar más peticiones
  buscarGifs( query: string, moreResults: boolean = false ):void {
    query = query.trim().toLowerCase();
    const lastQuery: string = localStorage.getItem('lastQuery') || '';
    const repetida: boolean = this._historial.includes( query );

    if ( query !== lastQuery && query.length > 0 && !repetida ) {
      if(this.biggerThan(this._historial)){
        this._historial.pop();
      }
      this._historial.unshift( query );
    }

    if( query !== lastQuery || moreResults ) {
      localStorage.setItem('historial', JSON.stringify(this._historial));
      localStorage.setItem('lastQuery', query);

      const params = new HttpParams()
        .set( 'api_key', this.apiKey )
        .set( 'limit', this.limit.toString() )
        .set( 'q', query )
  
      this.http.get<SearchGifsResponse>( `${ this.servicioUrl }/search`, { params } )
        .subscribe((resp) => {
          // console.log( resp.data );
          this.resultados = resp.data;
          localStorage.setItem('lastSearch', JSON.stringify(this.resultados));
        })
    } else {
      console.log('Consulta no realizada');
    }
  }

}
