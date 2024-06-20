import { CreateTaskBody, CustomAPIResponse, DynamicAPIArgument } from "@/common/types";
import { ITaskDocument, ITaskModel } from "@/models/task.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: Request) {
  const response: CustomAPIResponse<ITaskModel> = {
    status: 500,
    data: {} as ITaskModel
  };

  const client = new MongoClient(databaseURI);

  try {
    const data: CreateTaskBody = await request.json();

    await client.connect();
    const db = client.db(databaseName);

    // @ts-ignore: MongoDB inserts _id value when creating new document
    const task = await db.collection<ITaskDocument>("tasks").insertOne({
      ...data,
      _columnId: new ObjectId(data._columnId)
    });

    response.data = task || {};
    response.status = 200;
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, { status: response.status });
}
