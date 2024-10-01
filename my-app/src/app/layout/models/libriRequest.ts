import { ILibri } from "./libri";

export interface ILibriRequest {
  libri: ILibri;
  kategorite: string [];
  autoret: string [];
}