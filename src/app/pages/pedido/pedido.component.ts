import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DxDataGridModule, DxLoadPanelModule, DxSelectBoxModule} from "devextreme-angular";
import {HttpClientModule} from "@angular/common/http";
import {Pedido} from "../../shared/models/pedido";
import {PedidoService} from "../../shared/services/pedido.service";
import {Cliente} from "../../shared/models/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {ProdutoService} from "../../shared/services/produto.service";
import {Produto} from "../../shared/models/produto";


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedidos: Pedido[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  constructor(private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.getDadosPedido();
    this.getDadosCliente();
    this.getDadosProduto();
  }

  async getDadosPedido () {
    this.pedidos = await this.pedidoService.getPedidos().toPromise();
  }

  async getDadosCliente () {
    this.clientes = await this.clienteService.getClientes().toPromise();
  }

  async getDadosProduto () {
    this.produtos = await this.produtoService.getProdutos().toPromise();
  }


  // nomeCliente (item: any) {
  //   return item && '' + item.clientes.nome
  // }

  onInsertingPedido(event: any) {

  }

  onUpdatingPedido(event: any) {

  }

  onRemovingPedido($event: any) {

  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    HttpClientModule,
  ],
  declarations: [ PedidoComponent ],
  exports: [ PedidoComponent  ]
})
export class PedidoModule { }
