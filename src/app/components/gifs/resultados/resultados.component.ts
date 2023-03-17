import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  get resultados() {
    return this.gifsService.resultados;
  }

  copyToClipboard( url: string ) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(url);
    }
    return Promise.reject("The Clipboard API is not available.");
  };

  constructor( private gifsService: GifsService ) {}

  ngOnInit(): void {
  }

}
