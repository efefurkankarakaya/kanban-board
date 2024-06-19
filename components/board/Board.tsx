"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Column from "./Column";
import { data } from "@/data/tasks";
import Link from "next/link";
import SidePanel from "../side-panel/SidePanel";
import useTaskStore from "@/store/task.store";
import sendGetBoardRequest from "@/calls/board/get-board";
import { IBoardModel } from "@/models/board.model";
import { IColumnModel } from "@/models/column.model";
import sendGetColumnsRequest from "@/calls/board/get-columns";

const Board = () => {
  const pathname = usePathname();
  const [board, setBoard] = useState<IBoardModel>({});
  const [columns, setColumns] = useState<IColumnModel[]>([]);
  const updateTasks = useTaskStore((state) => state.updateTasks);

  useEffect(() => {
    updateTasks(data);
    const userName = pathname.split("board/")[1];
    sendGetBoardRequest(userName)
      .then((response) => response.json())
      .then((data) => setBoard(data))
      .catch((error) => console.error(error));

    sendGetColumnsRequest(board?._id)
      .then((response) => response.json())
      .then((data) => setColumns(data))
      .catch((error) => console.log(error));
  }, [pathname, updateTasks, board._id]);

  return (
    <div className="flex h-full w-full overflow-scroll">
      <div className="flex flex-col p-12">
        <div className="mb-7 ml-5">
          <h3 className="mb-1 font-semibold text-4xl">{board?.title}</h3>
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
          {columns.map((column) => (
            <Column
              key={column._id}
              title={column.title}
              columnId={column._id}
            />
          ))}
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
