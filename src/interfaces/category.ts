import {ObjectId} from 'mongodb';

export interface ICategory {
  title: string;
  description: string;
  imageUrl: string;
  _id: ObjectId;
}
