"use client";

import { Reorder } from "framer-motion";
import { useState } from "react";
import Task from "./Task";

interface Props {
  taskList: ITaskModel[];
  isDragAllowed: boolean;
}

const TaskList = (props: Props) => {
  const [items, setItems] = useState(props.taskList);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
    >
      {items.map((item) => (
        <Task
          key={item._id}
          data={item}
          isDragAllowed={props.isDragAllowed}
        />
      ))}
    </Reorder.Group>
  );
};

export default TaskList;
