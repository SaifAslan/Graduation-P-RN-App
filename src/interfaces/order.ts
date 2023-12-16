import {ObjectId} from 'mongodb';
import {ICart} from './cart';
import { IAddress } from './address';

export interface IOrder extends ICart {
  user: ObjectId;
  _id: ObjectId;
  address: IAddress;
  totalPrice: number;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Cancelled' | 'Delivered';
  orderDate: Date;
  coupon?: ObjectId;
}
