"use client";

import React, { useState } from "react";
import Column from "./Column";
import { data } from "@/data/tasks";
import Link from "next/link";
import SidePanel from "../side-panel/SidePanel";
import useTaskStore from "@/store/task.store";
import { useMount } from "react-use";

const Board = () => {
  const updateTasks = useTaskStore((state) => state.updateTasks);

  useMount(() => {
    updateTasks(data);
  });

  return (
    <div className="flex h-full w-full overflow-scroll">
      <div className="flex flex-col p-12">
        <div className="mb-7 ml-5">
          <h3 className="mb-1 font-semibold text-4xl">Roadmap</h3>
          <div className="flex flex-row text-xs gap-1 ">
            <p className="text-neutral-300">By Isaac N.C.</p>
            <Link
              className="text-neutral-400"
              href="https://www.isaacnc.com/"
              target="_blank"
            >
              Visit website.
            </Link>
          </div>
        </div>
        <div className="flex gap-3">
          <Column
            title="Backlog"
            columnId="backlog"
          />
          <Column
            title="To do"
            columnId="todo"
          />
          <Column
            title="In progress"
            columnId="in-progress"
          />
          <Column
            title="Done"
            columnId="done"
          />
        </div>
      </div>
      <SidePanel />
    </div>
  );
};

export default Board;
