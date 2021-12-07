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
    let clientes = await this.clienteService.getClientes().toPromise();
    this.clientes = [];
    clientes.forEach(x => {
      let novo = new Cliente();
      novo.id = x.id;
      novo.nome = x.nome;
      novo.codigo = x.codigo;
      this.clientes.push(novo);
    })
  }

  async getDadosProduto () {
    this.produtos = await this.produtoService.getProdutos().toPromise();
  }


  getCliente(id: number): string{
    let temp: any = this.clientes.find(x => x.id==id)
    return temp.nome;
  }
  mostraCodigoENomeCliente(cliente: Cliente) {
    return cliente && '' + cliente.codigo + ' - ' + cliente.nome;
  }

  mostraCodigoENomeProduto(produto: Produto) {
    return produto && '' + produto.codigo + ' - ' + produto.descricao;
  }

  onValueChangedCliente(event: any) {
    debugger
    this.clientes = event.value;
    console.log(this.clientes);
  }

  onValueChangedProduto(event: any) {
  }

  async onInsertingPedido(event: any) {
    // debugger;
    // let dados = event.data;
    // const novoPedido = await this.pedidoService.postPedido(dados).toPromise()
    // console.log(dados)
  }

  async onUpdatingPedido(event: any) {

  }

  async onRemovingPedido($event: any) {

  }

  clienteValueChange(event: any, data: any) {
    data.data.cliente = event;
  }

  onSaving(evente: any) {
    debugger;
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
