"use client";

import { ChangeEvent, useRef, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import useTaskStore from "@/store/task.store";
import { useClickAway } from "react-use";
import SidePanelHeader from "./Header";
import { FiLoader } from "react-icons/fi";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { WiTime9 } from "react-icons/wi";
import RowTitle from "./RowTitle";
import { FaRegCalendarAlt } from "react-icons/fa";

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
          <table className="table-auto">
            <tbody className="[&>tr>td]:p-2">
              <tr>
                <td>
                  <RowTitle
                    title="Status"
                    icon={FiLoader}
                  />
                </td>
                <td className="text-sm">{activeTask._columnId}</td>
                <td className="text-neutral-400">
                  <HiOutlineClipboardDocument />
                </td>
              </tr>
              <tr>
                <td>
                  <RowTitle
                    title="Created At"
                    icon={WiTime9}
                  />
                </td>
                <td className="text-sm">{new Date().toDateString()}</td>
                <td className="text-neutral-400">
                  <HiOutlineClipboardDocument />
                </td>
              </tr>
              <tr>
                <td>
                  <RowTitle
                    title="Edited At"
                    icon={WiTime9}
                  />
                </td>
                <td className="text-sm">{new Date().toDateString()}</td>
                <td className="text-neutral-400">
                  <HiOutlineClipboardDocument />
                </td>
              </tr>
              <tr>
                <td>
                  <RowTitle
                    title="Completed At"
                    icon={FaRegCalendarAlt}
                  />
                </td>
                <td className="text-sm">{new Date().toDateString()}</td>
                <td className="text-neutral-400">
                  <HiOutlineClipboardDocument />
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="flex flex-col-reverse divide-y divide-y-reverse"></div> */}
          <hr className="border-neutral-600/30 mt-10" />
        </div>
      </div>
    </SlidingPanel>
  );
};

export default SidePanel;
