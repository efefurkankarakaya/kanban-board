"use client";

import sendUpdateTaskRequest from "@/calls/board/update-task";
import { UpdateTaskBody } from "@/common/types";
import { ITaskModel } from "@/models/task.model";
import useTaskStore from "@/store/task.store";
import { ChangeEvent, useRef, useState } from "react";
import { useClickAway } from "react-use";

interface Props {
  taskId: ITaskModel["_id"];
  taskDescription: ITaskModel["description"];
  shouldSave: boolean;
}

const DetailDescription = (props: Props) => {
  const ref = useRef(null);
  const [isDirty, setIsDirty] = useState(false);

  const updateTask = useTaskStore((state) => state.updateTask);

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateTask({ description: e.target.value });
    setIsDirty(true);
  };

  useClickAway(ref, async () => {
    if (isDirty && props.shouldSave) {
      const data: UpdateTaskBody = { description: props.taskDescription };
      await sendUpdateTaskRequest(props.taskId, data);
    }

    setIsDirty(false);
  });

  return (
    <textarea
      ref={ref}
      className="border-none outline-none resize-none bg-transparent placeholder:text-neutral-500/50 text-sm text-neutral-300 w-full h-full"
      placeholder="Write something about the task"
      value={props.taskDescription}
      onChange={onChangeDescription}
      onInput={(e) => {
        e.currentTarget.style.height = "";
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
      }}
    />
  );
};

export default DetailDescription;
