import {Produto} from "./produto";
import {Pedido} from "./pedido";

export interface ItemPedido {

  id: number;
  pedido: Pedido;
  produto: Produto;
  quantidade: number;
  valorTotalItens: number;

}
