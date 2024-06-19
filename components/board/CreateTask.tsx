"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, LegacyRef, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useClickAway } from "react-use";
import { FiPlus } from "react-icons/fi";
import { ITaskModel } from "@/models/task.model";
import { TUpdateTasks } from "@/store/task.store";
import sendCreateTaskRequest from "@/calls/board/create-task";

interface Props {
  columnId: string;
  tasks: ITaskModel[];
  updateTasks: TUpdateTasks;
  newTaskIndex: number;
}

const CreateTask = ({ columnId, tasks, updateTasks, newTaskIndex }: Props) => {
  const [title, setTitle] = useState("");
  const [isCreateMode, setIsCreateMode] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    createTask();
  });

  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onKeyDownTitle = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  const onClickNew = () => {
    setIsCreateMode(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const clearTitle = () => {
    setTitle("");
  };

  const createTask = async () => {
    if (title.trim().length) {
      const task = {
        _columnId: columnId,
        title: title.trim(),
        description: "",
        color: "blue",
        priority: "",
        tags: [],
        order: newTaskIndex,
        createdAt: new Date(),
        editedAt: new Date()
      } as unknown as ITaskModel;

      const response = await sendCreateTaskRequest(task);
      const data = await response.json();
      task._id = data.insertedId;

      tasks.push(task);
      updateTasks([...tasks]);
    }

    clearTitle();
    setIsCreateMode(false);
  };

  return (
    <>
      {isCreateMode ? (
        <motion.form
          layout
          onSubmit={handleSubmit}
          ref={ref}
        >
          <textarea
            onChange={onChangeTitle}
            onKeyDown={onKeyDownTitle}
            autoFocus
            placeholder="Untitled"
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={onClickNew}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <FiPlus />
          <span>New</span>
        </motion.button>
      )}
    </>
  );
};

export default CreateTask;
