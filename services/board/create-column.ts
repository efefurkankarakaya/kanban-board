import { IColumnModel } from "@/models/column.model";
import { Collection, Document } from "mongodb";

type ColumnCreationData = {
  _boardId: string;
  title: string;
  createdAt: Date;
  editedAt: Date;
};

type CreateColumnResult = {
  acknowledged: boolean;
} & IColumnModel;

const createColumn = async (
  title: string,
  boardId: string,
  collection: Collection<Document & IColumnModel>
): Promise<CreateColumnResult> => {
  const newColumn: ColumnCreationData = {
    _boardId: boardId,
    title,
    createdAt: new Date(),
    editedAt: new Date()
  };

  const result = await collection.insertOne(newColumn as IColumnModel);

  const status: CreateColumnResult = { _id: result.insertedId.toString(), ...newColumn, acknowledged: result.acknowledged };

  return status;
};

export default createColumn;
