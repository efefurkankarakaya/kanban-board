import { CustomAPIResponse, DynamicAPIArgument } from "@/common/types";
import { IBoardModel } from "@/models/board.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient } from "mongodb";

type Params = {
  boardId: string;
};

export async function GET(request: Request, { params }: DynamicAPIArgument<Params>) {
  // Each user has their own board, so basically user names are actually visible board ids
  const { boardId: userName } = params;

  const response: CustomAPIResponse<IBoardModel> = {
    status: 500,
    data: {} as IBoardModel
  };

  const client = new MongoClient(databaseURI);

  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection<IBoardModel>("boards");
    const board = await collection.findOne({ userName });

    response.data = board || {};
    response.status = 200;
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, { status: response.status });
}
