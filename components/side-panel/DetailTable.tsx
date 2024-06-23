"use client";

import { FiLoader } from "react-icons/fi";
import { WiTime9 } from "react-icons/wi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ITaskModel } from "@/models/task.model";
import { IoColorPaletteOutline } from "react-icons/io5";
import { useMemo } from "react";
import CustomDatePicker from "./CustomDatePicker";
import useColumnStore from "@/store/column.store";
import DetailTableRow from "./DetailTableRow";
import ColorManager from "./ColorManager";

interface Props {
  activeTask: ITaskModel;
}

const DetailTable = ({ activeTask }: Props) => {
  const columns = useColumnStore((state) => state.columns);

  const columnName = useMemo(() => {
    // To get column name by its ID, each task has their column ID and this relationship allows us to access column data by its ID
    return columns.find((column) => column._id === activeTask._columnId)?.title;
  }, [columns, activeTask._columnId]);

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
          />
        </DetailTableRow>
        <DetailTableRow
          title="Color"
          titleIcon={IoColorPaletteOutline}
          clipboardText={activeTask.color}
        >
          <ColorManager
            activeTaskId={activeTask._id}
            activeTaskColor={activeTask.color}
          />
        </DetailTableRow>
      </tbody>
    </table>
  );
};

export default DetailTable;
