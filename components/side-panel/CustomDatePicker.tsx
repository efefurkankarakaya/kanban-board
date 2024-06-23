import sendUpdateTaskRequest from "@/calls/board/update-task";
import { UpdateTaskBody } from "@/common/types";
import { ITaskModel } from "@/models/task.model";
import useTaskStore from "@/store/task.store";
import { KeyboardEvent, MouseEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  taskId: string;
  completedAt: Date | undefined;
}

const CustomDatePicker = ({ taskId, completedAt }: Props) => {
  const updateTask = useTaskStore((state) => state.updateTask);

  const onChangeCompletedAt = async (
    date: Date | null,
    event?: MouseEvent<HTMLElement, globalThis.MouseEvent> | KeyboardEvent<HTMLElement> | undefined
  ) => {
    const data: UpdateTaskBody = { completedAt: date || undefined };
    updateTask(data);
    await sendUpdateTaskRequest(taskId, data);
  };

  return (
    <DatePicker
      className="bg-transparent cursor-pointer outline-none"
      onChange={onChangeCompletedAt}
      placeholderText="Empty"
      value={completedAt ? new Date(completedAt).toDateString() : undefined}
    />
  );
};

export default CustomDatePicker;
