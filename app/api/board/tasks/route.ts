import { CustomAPIResponse, RequestAllTasks } from "@/common/types";
import { ITaskModel } from "@/models/task.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: Request) {
  const response: CustomAPIResponse<ITaskModel[]> = {
    status: 500,
    data: [] as ITaskModel[]
  };

  const client = new MongoClient(databaseURI);

  try {
    const data: RequestAllTasks = await request.json();

    await client.connect();
    const db = client.db(databaseName);

    /**
     * There's a relationship between columns, tasks and boards.
     * Task (Many-to-one) -> Column
     * Column (Many-to-one) -> Board
     */
    const columns = await db
      .collection("columns")
      .find({ _boardId: new ObjectId(data.boardId) })
      .toArray();
    const columnIds = columns.map((column) => new ObjectId(column._id));

    // Finding tasks that are existed in the same board with their columns.
    const tasks = (
      await db
        .collection("tasks")
        .find({ _columnId: { $in: columnIds } }, { sort: { order: 1 } })
        .toArray()
    ).sort((a, b) => a.order - b.order);

    response.data = tasks || [];
    response.status = 200;
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, { status: response.status });
}
