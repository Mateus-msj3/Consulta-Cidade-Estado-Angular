import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {Cliente} from "../../shared/models/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];


  // changes: Change<Order>[] = [];
  isLoading = false;

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
     this.dadosClientes()
  }

  dadosClientes() {
    this.clienteService.getClientes().subscribe((dados) => (this.clientes = dados));
  }

  onSaving(event: any){
    debugger;
    const change = event.changes[0];

    if (change) {
      event.cancel = false;
      event.promises = this.processSaving(change);

    }

    console.log(event.changes)

  }

  async processSaving(change: any) {
    this.isLoading = true;

    try {
      await this.clienteService.saveChange(change).toPromise();
    }finally {
      this.isLoading = false;
      this.dadosClientes();
      console.log(change.data);

    }
  }

  // onRowUpdating(event: any) {
  //   const change = event.changes[0].key;
  //   const isCanceled = async() => {
  //     const dialog = await  confirm("Tem certeza?", "Confirmar aletrações");
  //     if (dialog) {
  //       let params = new HttpParams();
  //       for (let key in event.newData) {
  //         params = params.set(key, event.newData[key]);
  //       }
  //       const validationResult = await this.clienteService.saveChange(change).toPromise()
  //     }
  //   }
  // }

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
