import { CustomAPIResponse, DynamicAPIArgument, UpdateTaskBody } from "@/common/types";
import { ITaskDocument, ITaskModel } from "@/models/task.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, ObjectId } from "mongodb";

type UpdateTaskData = {
  editedAt: ITaskModel["editedAt"];
} & UpdateTaskBody;

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
    const data: UpdateTaskBody = await request.json();

    await client.connect();
    const db = client.db(databaseName);

    const update: UpdateTaskData = {
      ...data,
      editedAt: new Date()
    };

    const task = await db.collection<ITaskDocument>("tasks").findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      {
        $set: update
      },
      {
        returnDocument: "after"
      }
    );
    console.log(task);

    response.data = task || {};
    response.status = 200;
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, { status: response.status });
}
