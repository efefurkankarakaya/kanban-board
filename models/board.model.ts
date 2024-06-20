import { ObjectId } from "mongodb";
import { IUserDocument, IUserModel } from "./user.model";

export interface IBoardDocument {
  _id: ObjectId;
  _userId: IUserDocument["_id"];
  userName: IUserDocument["userName"];
  title: string;
}

export interface IBoardModel extends Omit<IBoardDocument, "_id" | "_userId"> {
  _id: string;
  _userId: IUserModel["_id"];
}
