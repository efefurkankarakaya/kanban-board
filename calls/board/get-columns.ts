import { GetAllColumnsBody } from "@/common/types";

const sendGetColumnsRequest = async (boardId: string): Promise<Response> => {
  if (!boardId) {
    return Promise.reject(new Error("Board ID is required"));
  }

  const endpoint = "/api/board/columns";
  const data: GetAllColumnsBody = { boardId };
  const body = JSON.stringify(data);

  return await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body
  });
};

export default sendGetColumnsRequest;
