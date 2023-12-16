//@ts-ignore
import {ObjectID} from 'mongodb';

export interface IUserInfo {
  name: string;
  email: string;
  surname: string;
  accessToken: string;
  phone: string;
  imageUrl: string;
  _id?: ObjectID;
}

export interface IUserInfoRegister {
  name: string;
  email: string;
  surname: string;
  phone: string;
  password: string;
  confirmPassword: string;
  _id?: ObjectID;
}
