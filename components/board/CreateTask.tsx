"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, LegacyRef, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useClickAway } from "react-use";
import { FiPlus } from "react-icons/fi";
import { ITaskModel } from "@/models/task.model";

interface Props {
  columnId: string;
  setTasks: any;
}

const CreateTask = ({ columnId, setTasks }: Props) => {
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

  const createTask = () => {
    if (title.trim().length) {
      const task = {
        _id: Math.random().toString(),
        _columnId: columnId,
        title: title.trim()
      };

      setTasks((previous: ITaskModel[]) => [...previous, task]);
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
