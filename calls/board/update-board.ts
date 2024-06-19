import { IBoardModel } from "@/models/board.model";

const sendUpdateBoardRequest = async (userName: string, data: Partial<IBoardModel>): Promise<Response> => {
  const endpoint = `/api/board/${userName}`;
  const body = JSON.stringify(data);

  return await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body
  });
};

export default sendUpdateBoardRequest;
