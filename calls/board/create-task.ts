import { ITaskModel } from "@/models/task.model";

const sendCreateTaskRequest = async (data: ITaskModel): Promise<Response> => {
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
