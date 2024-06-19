import { ObjectId } from "mongodb";
import { IBoardModel } from "./board.model";

export interface IColumnModel {
  _id: string;
  _boardId: IBoardModel["_id"];
  title: string;
  createdAt: Date;
  editedAt: Date;
}
