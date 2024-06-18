import { ITaskModel } from "./task.model";

export interface IColumnModel {
  _id: string;
  _boardId: string;
  title: string;
  tasks: ITaskModel[];
}
