import { CreateTaskBody } from "@/common/types";
import { ITaskModel } from "@/models/task.model";

const sendCreateTaskRequest = async (data: CreateTaskBody): Promise<Response> => {
  const endpoint = `/api/board/task/create`;
  const body = JSON.stringify(data);

  return await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body
  });
};

export default sendCreateTaskRequest;
