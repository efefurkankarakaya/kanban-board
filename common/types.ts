import { IColumnModel } from "@/models/column.model";
import { IUserModel } from "@/models/user.model";

export type CustomAPIResponse<T> = {
  status: number;
  data: T | Record<never, never>;
};

export type RequestColumnData = {
  columnId: IColumnModel["_id"];
};

export type RequestAllColumns = {
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
