import { GetAllTasksBody } from "@/common/types";

const sendGetTasksRequest = async (boardId: string): Promise<Response> => {
  const endpoint = "/api/board/tasks";
  const data: GetAllTasksBody = { boardId };
  const body = JSON.stringify(data);

  return await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body
  });
};

export default sendGetTasksRequest;
