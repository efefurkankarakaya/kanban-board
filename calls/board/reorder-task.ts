import { ITaskModel } from "@/models/task.model";

const sendReorderTaskRequest = async (data: ITaskModel[]): Promise<Response> => {
  if (!data.length) {
    return Promise.reject(new Error("No reordered task found."));
  }

  const endpoint = `/api/board/task/reorder`;
  const body = JSON.stringify(data);

  return await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body
  });
};

export default sendReorderTaskRequest;
