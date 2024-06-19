import { CustomAPIResponse, DynamicAPIArgument } from "@/common/types";
import { ITaskModel } from "@/models/task.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: Request) {
  const response: CustomAPIResponse<ITaskModel> = {
    status: 500,
    data: {} as ITaskModel
  };

  const client = new MongoClient(databaseURI);

  try {
    const data: ITaskModel = await request.json();

    await client.connect();
    const db = client.db(databaseName);
    const task = await db.collection<ITaskModel>("tasks").insertOne({
      ...data,
      // @ts-ignore
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
