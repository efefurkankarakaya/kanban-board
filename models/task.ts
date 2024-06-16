export interface ITaskModel {
  _id: string;
  _columnId: string;
  title: string;
  description: string;
  color: string;
  priority: string;
  tags: string[];
}

export class TaskModel implements ITaskModel {
  _id: string;
  title: string;
  _columnId: string;
  description: string;
  color: string;
  priority: string;
  tags: string[];

  constructor(task: ITaskModel) {
    this._id = task._id;
    this._columnId = task._columnId;
    this.title = task.title;
    this.description = task.description;
    this.color = task.color;
    this.priority = task.priority;
    this.tags = task.tags;
  }
}
