import sendUpdateTaskRequest from "@/calls/board/update-task";
import { TaskColor, TaskColorClassName } from "@/common/color";
import { UpdateTaskBody } from "@/common/types";
import { ITaskModel } from "@/models/task.model";
import useTaskStore from "@/store/task.store";
import { MouseEvent } from "react";

interface Props {
  activeTaskId: ITaskModel["_id"];
  activeTaskColor: ITaskModel["color"];
}

const ColorManager = (props: Props) => {
  const updateTask = useTaskStore((state) => state.updateTask);

  const onClickColor = async (e: MouseEvent<HTMLButtonElement>, color: TaskColor) => {
    const data: UpdateTaskBody = { color };
    updateTask(data);
    await sendUpdateTaskRequest(props.activeTaskId, data);
  };

  return (
    <div>
      {Object.keys(TaskColorClassName).map((color, index) => {
        return (
          <button
            onClick={(e) => onClickColor(e, color as TaskColor)}
            title={color.charAt(0).toUpperCase() + color.slice(1)}
            key={index}
            className={`${TaskColorClassName[color as TaskColor]} p-3 rounded-md mr-1 ${
              props.activeTaskColor === color ? "border-neutral-200 border-2" : ""
            }`}
          ></button>
        );
      })}
    </div>
  );
};

export default ColorManager;
