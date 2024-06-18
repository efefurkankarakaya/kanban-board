const URLPrefix = "/api/account";

export const sendGetUserByNameRequest = () => {};

export const sendSignInRequest = async (data: FormData) => {
  return await fetch(URLPrefix + "sign-in", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
};

export const sendSignUpRequest = async () => {};
