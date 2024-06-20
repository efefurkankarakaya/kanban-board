const sendGetBoardRequest = async (userName: string): Promise<Response> => {
  if (!userName) {
    return Promise.reject(new Error("User name is required"));
  }

  const endpoint = `/api/board/${userName}`;

  return await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  });
};

export default sendGetBoardRequest;
