import { TaskColor } from "@/common/color";

export interface ITaskModel {
  _id: string;
  _columnId: string;
  title: string;
  description: string;
  color: TaskColor;
  priority: string;
  tags: string[];
  completedAt?: Date;
  createdAt: Date;
  editedAt: Date;
}

export class TaskModel implements ITaskModel {
  _id: string;
  title: string;
  _columnId: string;
  description: string;
  color: TaskColor;
  priority: string;
  tags: string[];
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
    this.createdAt = task.createdAt;
    this.completedAt = task.completedAt;
    this.editedAt = task.editedAt;
  }
}