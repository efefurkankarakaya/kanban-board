import { IUserModel } from "@/models/user.model";
import { SignInBody, SignInResponseData } from "@/common/types";
import { Collection, Document } from "mongodb";

type UpdateUserResult = { acknowledged: boolean } & SignInResponseData;

const updateUser = async (data: SignInBody, users: Collection<Document & IUserModel>): Promise<UpdateUserResult> => {
  const { userName } = data;

  const filter = { userName };

  const updated: Partial<IUserModel> = {
    lastLogin: new Date()
  };

  const { acknowledged } = await users.updateOne(filter, { $set: updated });

  const result = { userName, lastLogin: updated.lastLogin, acknowledged } as UpdateUserResult;

  return result;
};

export default updateUser;
