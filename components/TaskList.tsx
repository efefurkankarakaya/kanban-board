import { AnimationDefinition, Reorder } from "framer-motion";
import { useState } from "react";
import data from "@/data/mock.json";

interface Props {
  taskList: ITaskModel[];
  isDragAllowed: boolean;
}

const TaskList = (props: Props) => {
  const [items, setItems] = useState(props.taskList || data); // TODO: Remove 'data' here

  return (
    <div className="">
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
      >
        {items.map((item) => (
          <Reorder.Item
            className="p-4 bg-task-pink mb-3 rounded-md cursor-pointer"
            key={item._id}
            value={item}
            onPointerDownCapture={(e) => !props.isDragAllowed && e.stopPropagation()} // To prevent drag simultaneously with the parent component
          >
            <h4 className="text-xs mb-1">{item.title}</h4>
            {item.description && <p className="text-xxs font-thin">{item.description}</p>}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default TaskList;
