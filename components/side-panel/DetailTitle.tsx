"use client";

import sendUpdateTaskRequest from "@/calls/board/update-task";
import { UpdateTaskBody } from "@/common/types";
import { ITaskModel } from "@/models/task.model";
import useTaskStore from "@/store/task.store";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useClickAway } from "react-use";

interface Props {
  taskId: ITaskModel["_id"];
  taskTitle: ITaskModel["title"];
  shouldSave: boolean;
}

const DetailTitle = (props: Props) => {
  const ref = useRef(null);
  const [isDirty, setIsDirty] = useState(false);

  const updateTask = useTaskStore((state) => state.updateTask);

  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateTask({ title: e.target.value });
    setIsDirty(true);
  };

  useClickAway(ref, async () => {
    if (isDirty && props.shouldSave) {
      const data: UpdateTaskBody = { title: props.taskTitle };
      await sendUpdateTaskRequest(props.taskId, data);
    }

    setIsDirty(false);
  });

  // For auto resize
  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  return (
    <textarea
      ref={ref}
      className="border-none outline-none resize-none bg-transparent placeholder:text-neutral-500/50 text-neutral-300 text-4xl font-semibold"
      placeholder="Untitled"
      value={props.taskTitle}
      onChange={onChangeTitle}
      onInput={onInput}
    />
  );
};

export default DetailTitle;
