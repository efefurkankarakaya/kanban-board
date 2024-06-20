import { SignInBody } from "@/common/types";

const URLPrefix = "/api/account";

export const sendGetUserByNameRequest = () => {};

export const sendSignInRequest = async (data: SignInBody) => {
  const endpoint = URLPrefix + "/sign-in";

  return await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

export const sendSignUpRequest = async () => {};
