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
    const { _columnId, ...rest }: Partial<ITaskModel> = await request.json();

    await client.connect();
    const db = client.db(databaseName);

    const update: Partial<ITaskModel> = {
      // @ts-ignore: IDs should be set as ObjectId
      _columnId: new ObjectId(_columnId),
      ...rest,
      editedAt: new Date()
    };

    const task = await db.collection<ITaskModel>("tasks").findOneAndUpdate(
      // @ts-ignore: IDs should be used as ObjectId in CRUD
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
