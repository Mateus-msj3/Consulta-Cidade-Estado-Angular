import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  estadoSelecionado: string = ''
  cidadeSelecionada: string = '';

  constructor() { }

  ngOnInit(): void {
  }


  onNomeEstado(event: any) {
    this.estadoSelecionado = event.nome
  }

  onNomeCidade(event: any) {
    this.cidadeSelecionada = event.nome;

  }
}
