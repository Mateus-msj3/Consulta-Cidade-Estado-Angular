import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {HttpClientModule} from "@angular/common/http";
import {Pedido} from "../../shared/models/pedido";
import {PedidoService} from "../../shared/services/pedido.service";


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.getDadosPedido();
  }

  async getDadosPedido () {
    this.pedidos = await this.pedidoService.getPedidos().toPromise();
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
