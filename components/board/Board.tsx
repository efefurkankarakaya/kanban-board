"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Column from "./Column";
import SidePanel from "../side-panel/SidePanel";
import useTaskStore from "@/store/task.store";
import sendGetBoardRequest from "@/calls/board/get-board";
import { IBoardModel } from "@/models/board.model";
import { IColumnModel } from "@/models/column.model";
import sendGetColumnsRequest from "@/calls/board/get-columns";
import sendGetTasksRequest from "@/calls/board/get-tasks";
import { useClickAway } from "react-use";
import sendUpdateBoardRequest from "@/calls/board/update-board";
import useColumnStore from "@/store/column.store";

const Board = () => {
  const ref = useRef(null);

  const pathname = usePathname();
  const userName = pathname.split("board/")[1];

  const [isDirty, setIsDirty] = useState(false);
  const [board, setBoard] = useState<IBoardModel>({} as IBoardModel);
  const [columns, setColumns] = useState<IColumnModel[]>([]);

  const updateTasks = useTaskStore((state) => state.updateTasks);
  const updateColumns = useColumnStore((state) => state.updateColumns);

  useEffect(() => {
    // const prepare = async () => {
    //   let response;

    //   response = await sendGetBoardRequest(userName);
    //   const _board: IBoardModel = await response.json();
    //   setBoard(_board);

    //   response = await sendGetColumnsRequest(_board._id);
    //   const _columns: IColumnModel[] = await response.json();
    //   setColumns(_columns);

    //   response = await sendGetTasksRequest(_board._id);
    //   const _tasks: ITaskModel[] = await response.json();
    //   updateTasks(_tasks);
    // };
    // prepare().then(() => console.log("Board is ready."));
    sendGetBoardRequest(userName)
      .then((response) => response.json())
      .then((data) => setBoard(data))
      .catch((error) => console.error(error));

    sendGetColumnsRequest(board?._id)
      .then((response) => response.json())
      .then((data) => setColumns(data))
      .catch((error) => console.log(error));

    sendGetTasksRequest(board._id)
      .then((response) => response.json())
      .then((data) => updateTasks(data))
      .catch((error) => console.error(error));
  }, [userName, updateTasks, board._id]);

  useEffect(() => {
    updateColumns(columns);
  }, [columns, updateColumns]);

  const onChangeHeader = (e: ChangeEvent<HTMLInputElement>) => {
    setBoard({ ...board, title: e.target.value });
    setIsDirty(true);
  };

  useClickAway(ref, async () => {
    if (isDirty) {
      await sendUpdateBoardRequest(userName, { title: board.title });
    }
    setIsDirty(false);
  });

  return (
    <div className="flex h-full w-full overflow-scroll">
      <div className="flex flex-col p-12">
        <div className="mb-7 ml-5">
          <h3
            ref={ref}
            className="mb-1 font-semibold text-4xl outline-none"
            // onKeyUp={onKeyUpHeader}
          >
            <input
              className="outline-none border-none bg-transparent"
              value={board?.title}
              onChange={onChangeHeader}
              placeholder="Untitled"
            />
          </h3>
          <div className="flex flex-row text-xs gap-1 ">
            <p className="text-neutral-300">Created by {userName}</p>
            {/* <p className="text-neutral-300">By Isaac N.C.</p>
            <Link
              className="text-neutral-400"
              href="https://www.isaacnc.com/"
              target="_blank"
            >
              Visit website.
            </Link> */}
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
        </div>
      </div>
      <SidePanel />
    </div>
  );
};

export default Board;
