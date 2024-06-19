import { IUserModel, UserCreationData } from "@/models/user.model";
import { SignUpFormData, SignUpResponse } from "@/types/auth.data-types";
import { Collection, Document } from "mongodb";

type CreateUserResult = { acknowledged: boolean } & SignUpResponse;

const createUser = async (data: SignUpFormData, users: Collection<Document & IUserModel>): Promise<CreateUserResult> => {
  const newUser: UserCreationData = {
    ...data,
    createdAt: new Date(),
    lastLogin: new Date()
  };

  const result = await users.insertOne(newUser as IUserModel);

  const status: CreateUserResult = { userName: newUser.userName, lastLogin: newUser.lastLogin, acknowledged: result.acknowledged };

  return status;
};

export default createUser;
