import { SignInFormData, SignInResponseData } from "@/types/auth.data-types";
import { IUserModel, UserCreationData } from "@/models/user.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, WithId } from "mongodb";
import createUser from "@/services/account/create-user";
import updateUser from "@/services/account/update-user";

type SignInResponse = {
  status: number;
  data: SignInResponseData;
};

export async function POST(request: Request) {
  const response: SignInResponse = {
    status: 500,
    data: {} as SignInResponseData
  };

  const client = new MongoClient(databaseURI);

  try {
    const data: SignInFormData = await request.json();

    await client.connect();
    const db = client.db(databaseName);
    const usersCollection = db.collection<IUserModel>("users");

    const user = await usersCollection.findOne({ userName: data.userName });

    let result;

    if (user) {
      result = await updateUser(data, usersCollection);
      console.log("User updated: ", result.userName);
    } else {
      result = await createUser(data, usersCollection);
      console.log("User created: ", result.userName);
    }

    const { userName, lastLogin, acknowledged } = result;

    if (acknowledged) {
      response.data = { userName, lastLogin };
      response.status = 200;
    }
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, {
    status: response.status
  });
}
