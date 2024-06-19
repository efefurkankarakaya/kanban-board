import { IUserModel, UserCreationData } from "@/models/user.model";
import { SignUpFormData } from "@/common/types";
import { Collection, Document } from "mongodb";

type CreateUserResult = { acknowledged: boolean } & IUserModel;

const createUser = async (data: SignUpFormData, users: Collection<Document & IUserModel>): Promise<CreateUserResult> => {
  const newUser: UserCreationData = {
    ...data,
    createdAt: new Date(),
    lastLogin: new Date()
  };

  const result = await users.insertOne(newUser as IUserModel);

  const status: CreateUserResult = {
    _id: result.insertedId.toString(),
    ...newUser,
    acknowledged: result.acknowledged
  };

  return status;
};

export default createUser;
