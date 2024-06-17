"use client";

import { useCallback, useRef, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useTaskStore from "@/store/task.store";
import { useClickAway } from "react-use";

interface Props {}

const SidePanel = (props: Props) => {
  const ref = useRef(null);
  const [activeTask, resetTask] = useTaskStore((state) => [state.task, state.resetTask]);

  useClickAway(ref, () => {
    resetTask();
  });

  const onClickRightArrow = useCallback(() => {
    resetTask();
  }, [resetTask]);

  return (
    <SlidingPanel
      type="right"
      isOpen={!!activeTask._id}
      size={30}
      panelClassName="bg-task-list/50 h-full"
      panelContainerClassName="bg-task-list/50 z-50"
    >
      <div
        className="h-full"
        ref={ref}
      >
        <div className="w-full p-2">
          <MdKeyboardDoubleArrowRight
            onClick={onClickRightArrow}
            className="text-neutral-500 cursor-pointer"
            size={23}
          />
        </div>
      </div>
    </SlidingPanel>
  );
};

export default SidePanel;
