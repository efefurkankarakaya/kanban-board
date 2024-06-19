import { TaskColor } from "@/common/color";
import { IColumnModel } from "./column.model";

export interface ITaskModel {
  _id: string;
  _columnId: IColumnModel["_id"];
  title: string;
  description: string;
  color: TaskColor;
  priority: string;
  tags: string[];
  order: number;
  completedAt?: Date;
  createdAt: Date;
  editedAt: Date;
}

export class TaskModel implements ITaskModel {
  _id: string;
  _columnId: IColumnModel["_id"];
  title: string;
  description: string;
  color: TaskColor;
  priority: string;
  tags: string[];
  order: number;
  completedAt?: Date;
  createdAt: Date;
  editedAt: Date;

  constructor(task: ITaskModel) {
    this._id = task._id;
    this._columnId = task._columnId;
    this.title = task.title;
    this.description = task.description;
    this.color = task.color;
    this.priority = task.priority;
    this.tags = task.tags;
    this.order = task.order;
    this.createdAt = task.createdAt;
    this.completedAt = task.completedAt;
    this.editedAt = task.editedAt;
  }
}
