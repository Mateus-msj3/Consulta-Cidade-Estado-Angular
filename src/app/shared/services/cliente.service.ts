import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../models/cliente";

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/xml' })
// }

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = '/api/cliente';

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/`)
  }

   public postCliente(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/`, data)
  }

  public putCliente(data: Cliente): Observable<Cliente> {
    console.log(data)
    return this.http.put<Cliente>(`${this.url}/`, data)
  }

  public deleteCliente(key:any): Observable<any> {
    return this.http.delete<Cliente>(`${this.url}/${key}`);
  }

  }

