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
import {ItemPedido} from "../../shared/models/itemPedido";


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedidos: Pedido[] = [];

  clientes: Cliente[] = [];

  produtos: Produto[] = [];

  itens: ItemPedido[] = [];

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

  //
  // async getDadosCliente () {
  //   let clientes = await this.clienteService.getClientes().toPromise();
  //   this.clientes = [];
  //   clientes.forEach(x => {
  //     let novo = new Cliente();
  //     novo.id = x.id;
  //     novo.nome = x.nome;
  //     novo.codigo = x.codigo;
  //     this.clientes.push(novo);
  //   })
  // }

  // getCliente(id: number): string{
  //   let temp: any = this.clientes.find(x => x.id==id)
  //   return temp.nome;
  // }

  mostraCodigoENomeCliente(cliente: Cliente) {
    return cliente && '' + cliente.codigo + ' - ' + cliente.nome;
  }

  mostraCodigoENomeProduto(produto: Produto) {
    return produto && '' + produto.codigo + ' - ' + produto.descricao;
  }


  clienteValueChange(event: any, data: any) {
    data.data.cliente = event;
    console.log(event);
  }

  produtoValueChange(event: any, data: any) {
    data.data.produto = event;
    console.log(event);
  }

  onSavingItensNoGrid(event: any, data: any) {
    let item = event.changes[0];
    if (item.type == 'insert') {
      item.data.valorTotalItens = item.data.quantidade * item.data.produto.valorUnitario;
    }else if (item.type == 'update' && item.data.quantidade) {
      item.data.valorTotalItens = item.data.quantidade * item.key.produto.valorUnitario;
    }
  }

  onInitNewRowItemPedido(event: any) {
    if (!event.data.itens) {
      event.data.itens = new Array<ItemPedido>();
    }
  }

  async onInsertingPedido(event: any) {
    debugger;
    let dados = event.data;
    const novoPedido = await this.pedidoService.postPedido(dados).toPromise()
    console.log(dados)
    this.getDadosPedido();
  }

  async onUpdatingPedido(event: any) {

  }

  async onRemovingPedido(event: any) {
    const pedidoRemovido = await  this.pedidoService.deletePedido(event.key).toPromise();
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
