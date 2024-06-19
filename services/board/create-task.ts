import { TaskColor } from "@/common/color";
import { ITaskModel } from "@/models/task.model";
import { Collection, Document } from "mongodb";

type TaskData = {
  _columnId: string;
  title: string;
  description: string;
  color: TaskColor;
  priority: string;
  tags: string[];
  order: number;
};

type TaskCreationData = {
  createdAt: Date;
  editedAt: Date;
} & TaskData;

type CreateTaskResult = {
  acknowledged: boolean;
} & ITaskModel;

const createTask = async (data: TaskData, collection: Collection<Document & ITaskModel>): Promise<CreateTaskResult> => {
  const newTask: TaskCreationData = {
    ...data,
    createdAt: new Date(),
    editedAt: new Date()
  };

  const result = await collection.insertOne(newTask as ITaskModel);

  const status: CreateTaskResult = { _id: result.insertedId.toString(), ...newTask, acknowledged: result.acknowledged };

  return status;
};

export default createTask;
