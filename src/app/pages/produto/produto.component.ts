import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {HttpClientModule, HttpParams} from "@angular/common/http";
import {ProdutoService} from "../../shared/services/produto.service";
import {Produto} from "../../shared/models/produto";
import { confirm } from 'devextreme/ui/dialog';
import applyChanges from "devextreme/data/apply_changes";


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService ) { }

  ngOnInit(): void {
    this.getDadosProduto();
  }

  async getDadosProduto () {
    this.produtos = await this.produtoService.getProdutos().toPromise();
  }

  async onInsertingProduto (event: any) {
    let dados = event.data;
    const novoProduto = await this.produtoService.postProduto(dados).toPromise();
    console.log(novoProduto);
    this.getDadosProduto();

  }


  async onUpdatingProduto (event: any) {
    debugger;
    let dados = event.data;
    for (let key in event.newData) {
      dados = dados.set(key, event.newData[key]);
    }
    const alteracoesProduto = await this.produtoService.putProduto(dados).toPromise();
    console.log(dados);
    this.getDadosProduto();
  }

  async onRemoveProduto (event: any) {
    const produtoRemovido = await  this.produtoService.deleteProduto(event.key).toPromise();
    console.log(produtoRemovido)

  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxLoadPanelModule,
    HttpClientModule,
  ],
  declarations: [ ProdutoComponent ],
  exports: [ ProdutoComponent  ]
})
export class ProdutoModule { }
