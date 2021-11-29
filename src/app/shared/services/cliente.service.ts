import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {Cliente} from "../models/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'http://localhost:8080/cliente/'

  constructor(private http: HttpClient) { }


  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}`)
  }

   postCliente(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}`, data)
  }

  putCliente(data: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}`, data)
  }

  deleteCliente(data: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`/${data.id}`);
  }

  saveChange(change: any){
    if (change.type === 'insert')
      return this.postCliente(change.data)
    else if (change.type === 'update')
      return this.putCliente(change.data)
    else if (change.type === 'remove')
      return this.deleteCliente(change.data)
    else
      return EMPTY;
    }
  }

