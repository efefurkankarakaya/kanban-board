const sendGetBoardRequest = async (userName: string): Promise<Response> => {
  const endpoint = `/api/board/${userName}`;

  return await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  });
};

export default sendGetBoardRequest;
