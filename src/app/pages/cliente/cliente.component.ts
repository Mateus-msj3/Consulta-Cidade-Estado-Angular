import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {Cliente} from "../../shared/models/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  isLoading = false;

  constructor(private clienteService: ClienteService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
     this.getClientes()
  }

  getClientes() {
    this.clienteService.getClientes().subscribe((dados) => (this.clientes = dados));
  }

  onSaving(event: any){
    debugger;
    const change = event.changes[0];

    if (change) {
      event.cancel = false;
      event.promises = this.processSaving(change);
    }

  }

  async processSaving(change: any) {
    this.isLoading = true;

    try {
      await this.clienteService.saveChange(change).toPromise();
    }finally {
      this.isLoading = false;
      this.getClientes();
    }
  }

  // async updateRow(event: any) {
  //   const isCanceled = async () => {
  //     const dialogResult = await confirm("Are you sure?", "Confirm changes");
  //     if (dialogResult) {
  //       let params = new HttpParams();
  //       for (let key in event.newData) {
  //         params = params.set(key, event.newData[key]);
  //       }
  //       const validationResult = await this.httpClient
  //         .get("https://url/to/your/validation/service", { params: params })
  //         .toPromise();
  //       if (validationResult.errorText) {
  //         console.log(validationResult.errorText);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       return true;
  //     }
  //   }
  //   event.cancel = await isCanceled();
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
