import {IProduct} from './product';

export interface ICart {
  items: {product: IProduct; quantity: number; size: string}[];
}
