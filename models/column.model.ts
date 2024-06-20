import { ObjectId } from "mongodb";
import { IBoardDocument, IBoardModel } from "./board.model";

export interface IColumnDocument {
  _id: ObjectId;
  _boardId: IBoardDocument["_id"];
  title: string;
  createdAt: Date;
  editedAt: Date;
}

export interface IColumnModel extends Omit<IColumnDocument, "_id" | "_boardId"> {
  _id: string;
  _boardId: IBoardModel["_id"];
}
