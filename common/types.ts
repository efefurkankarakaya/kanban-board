import { IBoardModel } from "@/models/board.model";
import { IColumnModel } from "@/models/column.model";
import { ITaskModel } from "@/models/task.model";
import { IUserModel } from "@/models/user.model";

export type DynamicAPIArgument<T> = {
  params: T;
};

export type CustomAPIResponse<T> = {
  status: number;
  data: T | Record<never, never>;
};

export type EmptyObject = Record<never, never>;

export type UpdateBoardData = {
  title: IBoardModel["title"];
};

export type RequestAllTasks = {
  boardId: IBoardModel["_id"];
};

export type CreateTaskBody = Omit<ITaskModel, "_id">;

export type UpdateTaskBody = {
  title?: ITaskModel["title"];
  description?: ITaskModel["description"];
  color?: ITaskModel["color"];
  priority?: ITaskModel["priority"];
  tags?: ITaskModel["tags"];
  order?: ITaskModel["order"];
  completedAt?: ITaskModel["completedAt"];
};

export type GetAllColumnsBody = {
  boardId: IColumnModel["_boardId"];
};

export type SignInFormData = {
  userName: IUserModel["userName"];
};

export type SignUpFormData = {
  userName: IUserModel["userName"];
};

export type SignInResponseData = {
  userName: IUserModel["userName"];
  lastLogin: IUserModel["lastLogin"];
};

export type SignUpResponseData = {
  userName: IUserModel["userName"];
  lastLogin: IUserModel["lastLogin"];
};
