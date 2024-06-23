"use client";

import { FiLoader } from "react-icons/fi";
import { WiTime9 } from "react-icons/wi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ITaskModel } from "@/models/task.model";
import { IoColorPaletteOutline } from "react-icons/io5";
import { TaskColor, TaskColorClassName } from "@/common/color";
import { MouseEvent, useMemo } from "react";
import sendUpdateTaskRequest from "@/calls/board/update-task";
import CustomDatePicker from "./CustomDatePicker";
import { UpdateTaskBody } from "@/common/types";
import useTaskStore from "@/store/task.store";
import useColumnStore from "@/store/column.store";
import DetailTableRow from "./DetailTableRow";

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
        <DetailTableRow
          title="Status"
          titleIcon={FiLoader}
          clipboardText={columnName || ""}
        >
          {columnName || ""}
        </DetailTableRow>

        <DetailTableRow
          title="Created At"
          titleIcon={WiTime9}
          clipboardText={new Date(activeTask.createdAt).toDateString()}
        >
          {new Date(activeTask.createdAt).toDateString()}
        </DetailTableRow>
        <DetailTableRow
          title="Edited At"
          titleIcon={WiTime9}
          clipboardText={new Date(activeTask.editedAt).toDateString()}
        >
          {new Date(activeTask.editedAt).toDateString()}
        </DetailTableRow>
        <DetailTableRow
          title="Completed At"
          titleIcon={FaRegCalendarAlt}
          clipboardText={activeTask.completedAt ? new Date(activeTask.completedAt).toDateString() : ""}
        >
          <CustomDatePicker
            taskId={activeTask._id}
            completedAt={activeTask.completedAt}
            updateTask={updateTask}
          />
        </DetailTableRow>
        <DetailTableRow
          title="Color"
          titleIcon={IoColorPaletteOutline}
          clipboardText={activeTask.color}
        >
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
        </DetailTableRow>
      </tbody>
    </table>
  );
};

export default DetailTable;
