"use client";

import { ChangeEvent, useRef } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import useTaskStore from "@/store/task.store";
import { useClickAway } from "react-use";
import SidePanelHeader from "./Header";
import useDimensions from "@/hooks/useDimensions";
import DetailTable from "./DetailTable";
import sendUpdateTaskRequest from "@/calls/board/update-task";
import { UpdateTaskBody } from "@/common/types";

interface Props {}

const SidePanel = (props: Props) => {
  const ref = useRef(null);
  const { width } = useDimensions();
  const [activeTask, updateTask, resetTask] = useTaskStore((state) => [state.task, state.updateTask, state.resetTask]);

  useClickAway(ref, async () => {
    const data: UpdateTaskBody = { title: activeTask.title, description: activeTask.description };
    await sendUpdateTaskRequest(activeTask._id, data);
    resetTask();
  });

  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateTask({ title: e.target.value });
  };

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateTask({ description: e.target.value });
  };

  return (
    <SlidingPanel
      type="right"
      isOpen={!!activeTask._id}
      size={width > 1366 ? 30 : width > 768 ? 45 : 100}
      panelClassName="bg-task-list h-full"
      panelContainerClassName="z-50 h-full"
    >
      <div
        className="h-full px-2 pt-2"
        ref={ref}
      >
        <SidePanelHeader />
        <div className="flex flex-col px-10 mt-10">
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
          <DetailTable
            activeTask={activeTask}
            updateTask={updateTask}
          />
          {/* <div className="flex flex-col-reverse divide-y divide-y-reverse"></div> */}
          <hr className="border-neutral-600/30 mt-10" />
          <div className="mt-5 h-full">
            <textarea
              className="border-none outline-none resize-none bg-transparent placeholder:text-neutral-500/50 text-sm text-neutral-300 w-full h-full"
              placeholder="Write something about the task"
              value={activeTask.description}
              onChange={onChangeDescription}
              onInput={(e) => {
                e.currentTarget.style.height = "";
                e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
              }}
            />
          </div>
        </div>
      </div>
    </SlidingPanel>
  );
};

export default SidePanel;
