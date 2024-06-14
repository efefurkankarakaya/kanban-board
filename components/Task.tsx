import { Reorder } from "framer-motion";

interface Props {
  data: ITaskModel;
  isDragAllowed: boolean;
}

const Task = (props: Props) => {
  return (
    <Reorder.Item
      className="p-4 bg-task-pink mb-3 rounded-md cursor-pointer"
      key={props.data._id}
      value={props.data}
      onPointerDownCapture={(e) => !props.isDragAllowed && e.stopPropagation()} // To prevent drag simultaneously with the parent component
    >
      <h4 className="text-xs mb-1">{props.data.title}</h4>
      {props.data.description && <p className="text-xxs font-thin">{props.data.description}</p>}
    </Reorder.Item>
  );
};

export default Task;
