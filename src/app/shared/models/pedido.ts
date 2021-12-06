import {Cliente} from "./cliente";
import {ItemPedido} from "./itemPedido";

export interface Pedido {

  id: number;
  numero: string;
  dataPedido: string;
  cliente: Cliente;
  itens: ItemPedido[];
  valorTotal: number;


}
