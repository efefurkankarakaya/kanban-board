import { ObjectId } from "mongodb";
import { IUserModel } from "./user.model";

export interface IBoardModel {
  _id: string;
  _userId: IUserModel["_id"];
  userName: IUserModel["userName"];
  title: string;
}
