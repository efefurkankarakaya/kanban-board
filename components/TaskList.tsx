import { Reorder } from "framer-motion";
import data from "@/data/mock.json";
import { useState } from "react";

interface Props {
  taskList: ITaskModel[];
}

const TaskList = ({ taskList }: Props) => {
  const [items, setItems] = useState(taskList || data);

  return (
    <div className="w-48 bg-task-list p-4 rounded-lg">
      <h3 className="text-white text-3xl font-semibold mb-3">Backlog</h3>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
      >
        {items.map((item) => (
          <Reorder.Item
            className="p-4 bg-task-pink mb-3 rounded-md"
            key={item._id}
            value={item}
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
