"use client";

import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";
import { DragEvent, MouseEvent, useCallback } from "react";
import { ITaskModel } from "@/models/task";
import { TaskColorClassName } from "@/common/color";
import useTaskStore from "@/store/task.store";

interface Props {
  data: ITaskModel;
  handleDragStart: (e: DragEvent<HTMLDivElement>, task: ITaskModel) => void;
}

const Task = ({ data, handleDragStart }: Props) => {
  const updateTask = useTaskStore((state) => state.updateTask);

  const { _id, _columnId, title } = data;

  // console.log("Task: ", _id, _columnId);

  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      updateTask(data);
    },
    [updateTask, data]
  );

  const onDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      console.log(e);
      handleDragStart(e, data);
    },
    [handleDragStart, data]
  );

  return (
    <>
      <DropIndicator
        beforeId={_id}
        columnId={_columnId}
      />
      <motion.div
        layout
        layoutId={_id}
        draggable="true"
        onClick={onClick}
        // @ts-ignore: Mismatched type in module declaration onDragStart(event: DragEvent<HTMLDivElement>, info: PanInfo) => void
        onDragStart={onDragStart}
        className={`cursor-grab p-4 ${
          data.color ? TaskColorClassName[data.color] : TaskColorClassName["blue"]
        } mb-3 rounded-md active:cursor-grabbing`}
      >
        <h4 className="text-xs mb-1">{title}</h4>
        <p className="text-xxs font-thin">{data.description}</p>
      </motion.div>
    </>
  );
};

export default Task;
