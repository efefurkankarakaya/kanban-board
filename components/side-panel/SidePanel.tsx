"use client";

import { ChangeEvent, useRef, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import useTaskStore from "@/store/task.store";
import { useClickAway } from "react-use";
import SidePanelHeader from "./Header";

interface Props {}

const SidePanel = (props: Props) => {
  const ref = useRef(null);
  const [activeTask, updateTask, resetTask] = useTaskStore((state) => [state.task, state.updateTask, state.resetTask]);

  useClickAway(ref, () => {
    resetTask();
  });

  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateTask({ title: e.target.value });
  };

  return (
    <SlidingPanel
      type="right"
      isOpen={!!activeTask._id}
      size={30}
      panelClassName="bg-task-list h-full"
      panelContainerClassName="z-50 h-full"
    >
      <div
        className="h-full px-2 pt-2"
        ref={ref}
      >
        <SidePanelHeader />
        <div className="flex px-10 mt-10">
          {/* <div
            content={detail.title}
            contentEditable
            className="border-none outline-none bg-white placeholder:text-neutral-500/50 text-neutral-300 text-4xl font-semibold"
            placeholder="Untitled"
            onChange={onChangeTitle}
          ></div> */}
          <textarea
            className="border-none outline-none resize-none bg-transparent placeholder:text-neutral-500/50 text-neutral-300 text-4xl font-semibold"
            placeholder="Untitled"
            value={activeTask.title}
            onChange={onChangeTitle}
            onInput={(e) => {
              e.currentTarget.style.height = "";
              e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
            }}
          />
        </div>
      </div>
    </SlidingPanel>
  );
};

export default SidePanel;
