import { SignInFormData } from "@/dto/user/auth.dto";
import { IUserModel, UserCreationData } from "@/models/user.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, WithId } from "mongodb";

type SignInResponse = {
  userName: string;
  lastLogin: Date;
};

export async function POST(request: Request) {
  let response: SignInResponse = {} as SignInResponse;

  try {
    const data: SignInFormData = await request.json();

    const client = MongoClient.connect(databaseURI);
    const db = (await client).db(databaseName);
    const usersCollection = db.collection("users");

    const user = (await usersCollection.findOne({ userName: data.userName })) || {};

    if (user) {
      const update: Partial<IUserModel> = {
        lastLogin: new Date()
      };

      await usersCollection.updateOne({ userName: data.userName }, { $set: update });
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
    }
  } catch (error) {
    console.log(error);
  }

  return Response.json(response);
}
