import { CustomAPIResponse, DynamicAPIArgument } from "@/common/types";
import { ITaskModel } from "@/models/task.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, ObjectId } from "mongodb";

export async function PATCH(request: Request) {
  const response: CustomAPIResponse<ITaskModel> = {
    status: 500,
    data: {} as ITaskModel
  };

  const client = new MongoClient(databaseURI);

  try {
    const tasks: ITaskModel[] = await request.json();
    console.log(tasks);

    tasks.forEach((task) => {
      // @ts-ignore
      task._columnId = new ObjectId(task._columnId);
    });

    await client.connect();
    const db = client.db(databaseName);

    // To update all the effected tasks by the move
    const bulkUpdate = tasks.map((task, index) => ({
      updateOne: {
        filter: { _id: new ObjectId(task._id) },
        update: { $set: { order: index, _columnId: task._columnId } }
      }
    }));

    // @ts-ignore: ObjectId is required for the bulk update.
    const result = await db.collection<ITaskModel>("tasks").bulkWrite(bulkUpdate);

    response.data = {};
    response.status = 200;
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, { status: response.status });
}
