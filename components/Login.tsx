"use client";

import { sendSignInRequest } from "@/calls/user/account";
import { SignInBody, SignInResponseData } from "@/common/types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import TypeWriter, { TypewriterClass } from "typewriter-effect";

interface Props {}

const Login = (props: Props) => {
  const router = useRouter();
  const [isTyped, setIsTyped] = useState(true);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;

    const data: SignInBody = { userName };

    const response = await sendSignInRequest(data);
    if (response.status === 200) {
      const responseData: SignInResponseData = await response.json();

      if (responseData.userName) {
        router.push(`/board/${responseData.userName}`);
      }
    } else {
      console.log("Login failed.");
    }
  };

  const onTypeWriterInit = (typewriter: TypewriterClass) => {
    typewriter
      .typeString("Please enter a name.")
      .callFunction(() => {
        console.log("Text is typed.");
      })
      .pauseFor(2500)
      .deleteAll()
      .callFunction(() => {
        console.log("Text is deleted.");
        setIsTyped(true);
      })
      .start();
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center items-center h-screen w-full bg-neutral-900"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        method="POST"
        onSubmit={onSubmit}
        className="w-full px-10"
      >
        {/* <motion.p className="flex flex-row items-center font-thin text-7xl"> */}
        {isTyped ? (
          <motion.input
            name="userName"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            placeholder="Please enter a name"
            className="bg-transparent border-b-2 p-3 outline-none w-full font-thin text-7xl"
            required
          />
        ) : (
          <motion.p className="flex flex-row justify-center font-thin text-7xl">
            <TypeWriter onInit={onTypeWriterInit} />
          </motion.p>
        )}
        {/* </motion.p> */}
      </motion.form>
    </motion.div>
  );
};

export default Login;
