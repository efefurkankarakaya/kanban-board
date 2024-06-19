import { CustomAPIResponse, RequestAllColumns, RequestColumnData } from "@/common/types";
import { IBoardModel } from "@/models/board.model";
import { IColumnModel } from "@/models/column.model";
import { databaseName, databaseURI } from "@/persistence/database";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: Request) {
  const response: CustomAPIResponse<IColumnModel[]> = {
    status: 500,
    data: [] as IColumnModel[]
  };

  const client = new MongoClient(databaseURI);

  console.log("try");
  try {
    // console.log(request.body);
    const data: RequestAllColumns = await request.json();
    console.log(data);

    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection<IColumnModel>("columns");
    // console.log(collection);

    // @ts-ignore: 24-char hex presentation of id is only being used ObjectId here.
    const columns = await collection.find({ _boardId: new ObjectId(data.boardId) }).toArray();

    response.data = columns || [];
    response.status = 200;
  } catch (error) {
    console.log(error);
  }

  await client.close();

  return Response.json(response.data, { status: response.status });
}
