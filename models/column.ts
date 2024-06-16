import { ITaskModel } from "./task";

export interface IColumnModel {
  _id: string;
  _boardId: string;
  title: string;
  tasks: ITaskModel[];
}
