import { CustomAPIResponse, DynamicAPIArgument } from "@/common/types";
import { ITaskModel } from "@/models/task.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, ObjectId } from "mongodb";

type Params = {
  taskId: string;
};

export async function PATCH(request: Request, { params }: DynamicAPIArgument<Params>) {
  const { taskId } = params;

  const response: CustomAPIResponse<ITaskModel> = {
    status: 500,
    data: {} as ITaskModel
  };

  const client = new MongoClient(databaseURI);

  try {
    const data: Partial<ITaskModel> = await request.json();
    console.log(data);

    await client.connect();
    const db = client.db(databaseName);

    const update: Partial<ITaskModel> = {
      ...data,
      editedAt: new Date()
    };

    const task = await db.collection<ITaskModel>("tasks").findOneAndUpdate(
      // @ts-ignore
      { _id: new ObjectId(taskId) },
      {
        $set: update
      },
      {
        returnDocument: "after"
      }
    );

    response.data = task || {};
    response.status = 200;
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, { status: response.status });
}
