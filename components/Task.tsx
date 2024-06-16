"use client";

import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";
import { DragEvent, useCallback } from "react";
import { ITaskModel } from "@/models/task";

interface Props {
  data: ITaskModel;
  handleDragStart: (e: DragEvent<HTMLDivElement>, task: ITaskModel) => void;
}

const Task = ({ data, handleDragStart }: Props) => {
  const { _id, _columnId, title } = data;

  // console.log("Task: ", _id, _columnId);

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
        // @ts-ignore: Mismatched type in module declaration onDragStart(event: DragEvent<HTMLDivElement>, info: PanInfo) => void
        onDragStart={onDragStart} // TODO: Fix type here and move this function above
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

export default Task;
