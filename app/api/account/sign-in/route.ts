import { CustomAPIResponse, SignInFormData, SignInResponseData } from "@/common/types";
import { IUserModel, UserCreationData } from "@/models/user.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, WithId } from "mongodb";
import createUser from "@/services/account/create-user";
import updateUser from "@/services/account/update-user";
import { IBoardModel } from "@/models/board.model";
import createBoard from "@/services/board/create-board";
import { IColumnModel } from "@/models/column.model";
import { ITaskModel } from "@/models/task.model";
import createColumn from "@/services/board/create-column";
import * as tasks from "@/data/tasks";
import createTask from "@/services/board/create-task";

// TODO: Refactor here.
export async function POST(request: Request) {
  const response: CustomAPIResponse<SignInResponseData> = {
    status: 500,
    data: {} as SignInResponseData
  };

  const client = new MongoClient(databaseURI);

  try {
    const data: SignInFormData = await request.json();

    await client.connect();
    const db = client.db(databaseName);

    const usersCollection = db.collection<IUserModel>("users");
    const boardsCollection = db.collection<IBoardModel>("boards");
    const columnsCollection = db.collection<IColumnModel>("columns");
    const tasksCollection = db.collection<ITaskModel>("tasks");

    const user = await usersCollection.findOne({ userName: data.userName });

    let result;

    if (user) {
      result = await updateUser(data, usersCollection);
      console.log("User updated: ", result.userName);
    } else {
      result = await createUser(data, usersCollection);
      console.log("User created: ", result.userName);

      const userDataForBoard = { _userId: result._id, userName: result.userName };
      const board = await createBoard(userDataForBoard, boardsCollection);

      const backlog = await createColumn("Backlog", board._id, columnsCollection);
      const todo = await createColumn("To do", board._id, columnsCollection);
      const inProgress = await createColumn("In progress", board._id, columnsCollection);
      const done = await createColumn("Done", board._id, columnsCollection);

      const columns = {
        backlog: backlog._id,
        todo: todo._id,
        "in-progress": inProgress._id,
        done: done._id
      };

      for (const task of tasks.data) {
        const { _columnId, title, description, color, priority, tags } = task;

        const taskData = {
          _columnId: columns[_columnId as tasks.TaskColumnId],
          title,
          description,
          color,
          priority,
          tags
        };

        await createTask(taskData, tasksCollection);
      }
    }

    const { userName, lastLogin, acknowledged } = result;

    if (acknowledged) {
      response.data = { userName, lastLogin };
      response.status = 200;
    }
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, {
    status: response.status
  });
}
