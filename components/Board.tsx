"use client";

import { useCallback, useState } from "react";
import { Reorder } from "framer-motion";
import data from "@/data/column.json";
import TaskList from "./TaskList";
import { RiDraggable } from "react-icons/ri";

const Board = () => {
  const [columns, setColumns] = useState(data);
  const [isDragMode, setIsDragMode] = useState(false);

  const onClickDragButton = useCallback(() => {
    setIsDragMode(true);
  }, [setIsDragMode]);

  const onDragEnd = useCallback(() => {
    setIsDragMode(false);
  }, [setIsDragMode]);

  return (
    <div>
      <Reorder.Group
        className="flex flex-row"
        axis="x"
        values={columns}
        onReorder={setColumns}
      >
        {columns.map((column) => (
          <Reorder.Item
            className="w-48 bg-task-list p-4 rounded-lg mr-5"
            key={column._id}
            value={column}
            dragListener={isDragMode}
            onDragEnd={onDragEnd}
          >
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-white text-3xl font-semibold mb-3">Backlog</h3>
              <RiDraggable
                onMouseMove={onClickDragButton}
                className="cursor-pointer"
                size={18}
              />
            </div>
            <TaskList
              taskList={column.tasks}
              isDragAllowed={!isDragMode}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default Board;
