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
import {FirstKeysToConsoleModule} from "../../shared/pipe/first-keys-to-console.pipe";


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
    console.log(1)
  }

  getDadosCliente () {
    this.clienteService.getClientes().subscribe(x => {
      this.clientes = x;
    });
    console.log(2)
  }

  async getDadosProduto () {
    this.produtos = await this.produtoService.getProdutos().toPromise();
    console.log(3)
  }

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
    debugger
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

  // onSavingPedido(event: any) {
  //   debugger;
  //   if (event) {
  //     event.cancel = false;
  //     event.promises = this.processSaving(event);
  //   }
  // }
  //
  // async processSaving(event: any) {
  //   for (let change of event.changes) {
  //     if (change.type == 'insert') {
  //       let novo = await this.pedidoService.postPedido(change.data).toPromise();
  //       this.pedidos.push(novo);
  //       this.pedidos = applyChanges(this.pedidos, [novo], {keyExpr: 'id'});
  //       this.getDadosPedido();
  //     }
  //     else if (change.type == 'update') {
  //       change.data = Object.assign(change.key, change.data);
  //       let alterado = await this.pedidoService.putPedido(change.data).toPromise();
  //       this.pedidos = applyChanges(this.pedidos, [alterado], {keyExpr: 'id'});
  //     }
  //     else if (change.type == 'remove') {
  //       await this.pedidoService.deletePedido(change.key).toPromise();
  //     }
  //
  //   }
  //   event.cancel = false;
  // }


  onRowInsertingPedido(event: any) {
    debugger;
    let dadosDoPedido = event.data;
    const novoPedido = this.pedidoService.postPedido(dadosDoPedido).toPromise()
    console.log(event.data)
    console.log(novoPedido);
    this.ngOnInit();
  }

  onRowUpdatingPedido(event: any) {
    console.log(event);
  }

  onRowRemovingPedido(event: any) {
   this.pedidoService.deletePedido(event.key).toPromise();
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    HttpClientModule,
    FirstKeysToConsoleModule,
  ],
  declarations: [ PedidoComponent ],
  exports: [ PedidoComponent  ]
})
export class PedidoModule { }
