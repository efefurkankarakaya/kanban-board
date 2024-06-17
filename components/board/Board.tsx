"use client";

import React, { useState } from "react";
import Column from "./Column";
import { data } from "@/data/tasks";
import Link from "next/link";
import SidePanel from "../side-panel/SidePanel";

const Board = () => {
  const [tasks, setTasks] = useState(data);

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
            tasks={tasks}
            setTasks={setTasks}
          />
          <Column
            title="To do"
            columnId="todo"
            tasks={tasks}
            setTasks={setTasks}
          />
          <Column
            title="In progress"
            columnId="in-progress"
            tasks={tasks}
            setTasks={setTasks}
          />
          <Column
            title="Done"
            columnId="done"
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>
      <SidePanel />
    </div>
  );
};

export default Board;
