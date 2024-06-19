import { IBoardModel } from "@/models/board.model";
import { Collection, Document } from "mongodb";

type UserData = {
  _userId: string;
  userName: string;
};

type BoardCreationData = {
  _userId: string;
  userName: string;
  title: string;
};

type CreateBoardResult = {
  acknowledged: boolean;
} & IBoardModel;

const createBoard = async (userData: UserData, collection: Collection<Document & IBoardModel>): Promise<CreateBoardResult> => {
  const newBoard: BoardCreationData = {
    ...userData,
    title: "Untitled"
  };

  const result = await collection.insertOne(newBoard as IBoardModel);

  const status: CreateBoardResult = { _id: result.insertedId.toString(), ...newBoard, acknowledged: result.acknowledged };

  return status;
};

export default createBoard;
