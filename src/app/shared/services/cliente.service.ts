import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {Cliente} from "../models/cliente";
import applyChanges from "devextreme/data/apply_changes";
import DevExpress from "devextreme";
import data = DevExpress.data;

// export class Change<T> {
//   // @ts-ignore
//   type: 'insert' | 'update' | 'remove';
//
//   key: any;
//
//   // @ts-ignore
//   data: Partial<T>;
// }



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'http://localhost:8080/cliente/';
  clientes: Cliente[] = [];

  // private clientes$ = new BehaviorSubject<Cliente[]>([]);

  constructor(private http: HttpClient) { }


  // updateClientes(change: Change<Order>, data: Order) {
  //   change.data = data;
  //   const orders = applyChanges(this.orders$.getValue(), [change], { keyExpr: 'OrderID' });
  //   this.orders$.next(orders);
  // }

  // aplicarMudancas(change: Change<Cliente>, data: Cliente) {
  //   change.data = data;
  //   const clientes = applyChanges(this.clientes$.getValue(), [change], {keyExpr: 'id'});
  //   this.clientes$.next(clientes);
  // }

//   store.update(1, { value: "new value" })
// .done(function(values) {
//   //handle successfull updating
// })
//   .fail(function(error) {
//     //handle error
//   });



  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}`)
  }

   postCliente(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}`, data)
  }

  putCliente(data: Cliente, key:any): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}${key}`, data)
  }

  // async putCliente(change: Change<Cliente>): Promise<Cliente> {
  //   const httpParam = new HttpParams({fromObject/})
  //   const data = await this.http.put<Cliente>(`${this.url}`).toPromise();
  //   this.aplicarMudancas(change, data);
  //   return data;
  // }

  deleteCliente(key: any): Observable<any> {
    return this.http.delete<Cliente>(`${this.url}${key}`);
  }


  saveChange(change: any){
    if (change.type === 'insert')
      return this.postCliente(change.data)
    else if (change.type === 'update') {
      // applyChanges([change.data], [change.data], {keyExpr: 'id'})
      if (change.data.codigo) {
        change.data.codigo = change.data.codigo;
        //applyChanges([change.data], [change.data], {keyExpr: 'id'})
        // this.putCliente(change.data, change.key);
        // change.data.id = change.data.id;
        // change.data.codigo = change.data.codigo;
        // change.data.nome = change.data.nome;
      }
      if (change.data.nome){
        change.data.nome = change.data.nome;
        //applyChanges([change.data], [change.data], {keyExpr: 'id'})
        // this.putCliente(change.data, change.key);
      }
      // if (change.data.nome == change.data.nome){
      //   change.data.nome = change.data.nome;
      //   // this.putCliente(change.data, change.key);
      // }
      return this.putCliente(change.data, change.key)
    }
    else if (change.type === 'remove'){
      return this.deleteCliente(change.key)
    }
    else
      return EMPTY;
    }
  }

