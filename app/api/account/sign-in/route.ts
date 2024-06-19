import { SignInFormData, SignInResponse } from "@/types/auth.data-types";
import { IUserModel, UserCreationData } from "@/models/user.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, WithId } from "mongodb";

export async function POST(request: Request) {
  let response: SignInResponse = {} as SignInResponse;

  const client = new MongoClient(databaseURI);

  try {
    const data: SignInFormData = await request.json();

    await client.connect();
    const db = (await client).db(databaseName);
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ userName: data.userName });

    if (user) {
      console.log("User found: ", user);

      const updated: Partial<IUserModel> = {
        lastLogin: new Date()
      };

      response = { userName: user.userName, lastLogin: updated.lastLogin } as SignInResponse;

      await usersCollection.updateOne({ userName: data.userName }, { $set: updated });
    } else {
      const newUser: UserCreationData = {
        userName: data.userName,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      const result = await usersCollection.insertOne(newUser);

      if (result.acknowledged) {
        response = { userName: newUser.userName, lastLogin: newUser.lastLogin };
      }

      console.log("User created: ", newUser.userName);
    }
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response);
}
