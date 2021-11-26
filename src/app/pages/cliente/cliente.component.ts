import {Component, NgModule, OnInit} from '@angular/core';
import {Cliente} from "../../shared/models/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente[] = [];


  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(dados => {
      this.cliente = dados;
      console.log(dados)
    });
  }

  onCreateCliente(event: any) {
    const dadosNovoCliente = {
      codigo: event.changes[0].data.codigo,
      nome: event.changes[0].data.nome,
    }
    debugger
    console.log(event);
    this.clienteService.postCliente(dadosNovoCliente).subscribe(response => {
      console.log("Cliente Criado com sucesso")
    })
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxLoadPanelModule,
    HttpClientModule,
  ],
  declarations: [ ClienteComponent ],
  exports: [ ClienteComponent  ]
})
export class ClienteModule { }
