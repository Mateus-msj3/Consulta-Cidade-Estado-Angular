import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {HttpClientModule} from "@angular/common/http";
import {Cliente} from "../../models/cliente";
import {ClienteService} from "../../services/cliente.service";

@Component({
  selector: 'crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.scss']
})
export class CrudClienteComponent implements OnInit {

  cliente: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(dados => {this.cliente = dados; console.log(dados)});
  }


}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxLoadPanelModule,
    HttpClientModule,
  ],
  declarations: [ CrudClienteComponent ],
  exports: [ CrudClienteComponent  ]
})
export class CrudClienteModule { }

