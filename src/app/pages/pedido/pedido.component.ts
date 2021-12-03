import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {HttpClientModule} from "@angular/common/http";
import {ProdutoComponent} from "../produto/produto.component";

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxLoadPanelModule,
    HttpClientModule,
  ],
  declarations: [ PedidoComponent ],
  exports: [ PedidoComponent  ]
})
export class PedidoModule { }
