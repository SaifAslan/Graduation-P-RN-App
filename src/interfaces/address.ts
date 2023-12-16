//@ts-ignore
import {ObjectID} from 'mongodb';
export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  title: string;
  default: boolean;
}

export interface IAddressRequest extends IAddress {
  _id: ObjectID;
  user: ObjectID;
}
