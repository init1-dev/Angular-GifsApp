import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  selectedOption: string = '';

  constructor( private gifsService: GifsService ) {
    this.selectedOption = JSON.stringify(this.gifsService.limit);
  }

  cambiar() {
    const lastQuery = localStorage.getItem('lastQuery') || '';
    localStorage.setItem('nResultados', this.selectedOption);
    this.gifsService.setLimit = JSON.parse(this.selectedOption);
    this.gifsService.buscarGifs( lastQuery, true );
  }

  get historial() {
    return this.gifsService.historial;
  }

  vaciarStorage() {
    if (localStorage.length > 0) {
      localStorage.clear();
      location.reload();
    }
  }

  buscar( termino: string ) {
    const lastQuery = localStorage.getItem('lastQuery');

    if( termino === lastQuery ){
      console.log('Busqueda abortada, repetida');
    } else {
      this.gifsService.buscarGifs(termino)
    }
  }

  ngOnInit(): void {
  }

}
