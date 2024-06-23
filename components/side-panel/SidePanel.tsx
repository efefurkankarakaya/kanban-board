"use client";

import { ChangeEvent, useRef, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import useTaskStore from "@/store/task.store";
import { useClickAway } from "react-use";
import SidePanelHeader from "./Header";
import useDimensions from "@/hooks/useDimensions";
import DetailTable from "./DetailTable";
import DetailTitle from "./DetailTitle";
import DetailDescription from "./DetailDescription";
import sendUpdateTaskRequest from "@/calls/board/update-task";

interface Props {}

const SidePanel = (props: Props) => {
  const ref = useRef(null);
  const { width } = useDimensions();

  const [shouldSave, setShouldSave] = useState(true); // To prevent race condition (multiple request sending) in child components

  const [activeTask, resetTask] = useTaskStore((state) => [state.task, state.resetTask]);

  useClickAway(ref, async () => {
    setShouldSave(false);

    // If user closes the side panel, then save the changes before resetting the latest data in the store
    const data: UpdateTaskBody = { title: activeTask.title, description: activeTask.description };
    await sendUpdateTaskRequest(activeTask._id, data);
    resetTask();

    setShouldSave(true);
  });

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
          <DetailTitle
            taskId={activeTask._id}
            taskTitle={activeTask.title}
            shouldSave={shouldSave}
          />
          <DetailTable activeTask={activeTask} />
          {/* <div className="flex flex-col-reverse divide-y divide-y-reverse"></div> */}
          <hr className="border-neutral-600/30 mt-10" />
          <div className="mt-5 h-full">
            <DetailDescription
              taskId={activeTask._id}
              taskDescription={activeTask.description}
              shouldSave={shouldSave}
            />
          </div>
        </div>
      </div>
    </SlidingPanel>
  );
};

export default SidePanel;
