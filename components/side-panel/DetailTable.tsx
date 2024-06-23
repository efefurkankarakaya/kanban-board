"use client";

import { FiLoader } from "react-icons/fi";
import RowTitle from "./RowTitle";
import { WiTime9 } from "react-icons/wi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ITaskModel } from "@/models/task.model";
import CopyButton from "./CopyButton";
import { IoColorPaletteOutline } from "react-icons/io5";
import { TaskColor, TaskColorClassName } from "@/common/color";
import { MouseEvent, useMemo } from "react";
import sendUpdateTaskRequest from "@/calls/board/update-task";
import CustomDatePicker from "./CustomDatePicker";
import { UpdateTaskBody } from "@/common/types";
import useTaskStore from "@/store/task.store";
import useColumnStore from "@/store/column.store";

interface Props {
  activeTask: ITaskModel;
}

const DetailTable = ({ activeTask }: Props) => {
  const updateTask = useTaskStore((state) => state.updateTask);
  const columns = useColumnStore((state) => state.columns);

  const columnName = useMemo(() => {
    // To get column name by its ID, each task has their column ID and this relationship allows us to access column data by its ID
    return columns.find((column) => column._id === activeTask._columnId)?.title;
  }, [columns, activeTask._columnId]);

  const onClickColor = async (e: MouseEvent<HTMLButtonElement>, color: TaskColor) => {
    const data: UpdateTaskBody = { color };
    updateTask(data);
    await sendUpdateTaskRequest(activeTask._id, data);
  };

  return (
    <table className="table-auto">
      <tbody className="[&>tr>td]:p-2">
        <tr className="hover:bg-neutral-600/50">
          <td>
            <RowTitle
              title="Status"
              icon={FiLoader}
            />
          </td>
          <td className="text-sm rounded-sm">{columnName}</td>
          <td className="text-neutral-400">
            <CopyButton text={columnName || ""} />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Created At"
              icon={WiTime9}
            />
          </td>
          <td className="text-sm">{new Date(activeTask.createdAt).toDateString()}</td>
          <td className="text-neutral-400">
            <CopyButton text={new Date(activeTask.createdAt).toDateString()} />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Edited At"
              icon={WiTime9}
            />
          </td>
          <td className="text-sm">{new Date(activeTask.editedAt).toDateString()}</td>
          <td className="text-neutral-400">
            <CopyButton text={new Date(activeTask.editedAt).toDateString()} />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Completed At"
              icon={FaRegCalendarAlt}
            />
          </td>
          <td className="text-sm">
            <CustomDatePicker
              taskId={activeTask._id}
              completedAt={activeTask.completedAt}
              updateTask={updateTask}
            />
          </td>
          <td className="text-neutral-400">
            <CopyButton text={activeTask.completedAt ? new Date(activeTask.completedAt).toDateString() : ""} />
          </td>
        </tr>
        <tr>
          <td>
            <RowTitle
              title="Color"
              icon={IoColorPaletteOutline}
            />
          </td>
          <td className="text-sm">
            <div>
              {Object.keys(TaskColorClassName).map((color, index) => {
                return (
                  <button
                    onClick={(e) => onClickColor(e, color as TaskColor)}
                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                    key={index}
                    className={`${TaskColorClassName[color as TaskColor]} p-3 rounded-md mr-1 ${
                      activeTask.color === color ? "border-neutral-200 border-2" : ""
                    }`}
                  ></button>
                );
              })}
            </div>
          </td>
          <td className="text-neutral-400">
            <CopyButton text={activeTask.completedAt ? new Date(activeTask.completedAt).toDateString() : ""} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DetailTable;
