"use client";

import { useRef } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import useTaskStore from "@/store/task.store";
import { useClickAway } from "react-use";
import SidePanelHeader from "./Header";

interface Props {}

const SidePanel = (props: Props) => {
  const ref = useRef(null);
  const [activeTask, resetTask] = useTaskStore((state) => [state.task, state.resetTask]);

  useClickAway(ref, () => {
    resetTask();
  });

  return (
    <SlidingPanel
      type="right"
      isOpen={!!activeTask._id}
      size={30}
      panelClassName="bg-task-list h-full"
      // panelContainerClassName="z-50"
    >
      <div
        className="h-full"
        ref={ref}
      >
        <SidePanelHeader />
      </div>
    </SlidingPanel>
  );
};

export default SidePanel;
