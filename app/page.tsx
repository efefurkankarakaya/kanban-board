"use client";

import Board from "@/components/Board";
import TaskList from "@/components/TaskList";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* <TaskList taskList={[]} /> */}
      <Board />
    </main>
  );
}
