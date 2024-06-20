import { UpdateTaskBody } from "@/common/types";

const sendUpdateTaskRequest = async (taskId: string, data: UpdateTaskBody): Promise<Response> => {
  const endpoint = `/api/board/task/${taskId}`;
  const body = JSON.stringify(data);

  return await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body
  });
};

export default sendUpdateTaskRequest;
