import sendUpdateTaskRequest from "@/calls/board/update-task";
import { ITaskModel } from "@/models/task.model";
import { KeyboardEvent, MouseEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  taskId: string;
  completedAt: Date | undefined;
  updateTask: (data: Partial<ITaskModel>) => void;
}

const CustomDatePicker = ({ taskId, completedAt, updateTask }: Props) => {
  const onChangeCompletedAt = async (
    date: Date | null,
    event?: MouseEvent<HTMLElement, globalThis.MouseEvent> | KeyboardEvent<HTMLElement> | undefined
  ) => {
    const data = { completedAt: date || undefined };

    updateTask(data);
    await sendUpdateTaskRequest(taskId, data);
  };

  return (
    <DatePicker
      className="bg-task-list cursor-pointer outline-none"
      onChange={onChangeCompletedAt}
      // selected={}
      value={completedAt ? new Date(completedAt).toDateString() : new Date().toDateString()}
    />
  );
};

export default CustomDatePicker;
