"use client";

import { useCallback, useState } from "react";
import { Reorder } from "framer-motion";
import { RiDraggable } from "react-icons/ri";
import TaskList from "./TaskList";

interface Props {
  data: IColumnModel;
}

const Column = ({ data }: Props) => {
  const [isDragMode, setIsDragMode] = useState(false);

  const onClickDragButton = useCallback(() => {
    setIsDragMode(true);
  }, [setIsDragMode]);

  const onDragEnd = useCallback(() => {
    setIsDragMode(false);
  }, [setIsDragMode]);

  return (
    <Reorder.Item
      className="w-64 bg-task-list p-4 rounded-lg mr-5"
      key={data._id}
      value={data}
      dragListener={isDragMode}
      onDragEnd={onDragEnd}
    >
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-white text-3xl font-semibold mb-3">{data.title}</h3>
        <RiDraggable
          onMouseMove={onClickDragButton}
          className="cursor-pointer"
          size={18}
        />
      </div>
      <TaskList
        taskList={data.tasks}
        isDragAllowed={!isDragMode}
      />
    </Reorder.Item>
  );
};

export default Column;
