import React, { useState } from "react";
import Column from "./Column";
import { data } from "@/data/tasks";

const Board = () => {
  const [tasks, setTasks] = useState(data);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        columnId="backlog"
        headingColor="text-neutral-500"
        tasks={tasks}
        setTasks={setTasks}
      />
      <Column
        title="To do"
        columnId="todo"
        headingColor="text-yellow-200"
        tasks={tasks}
        setTasks={setTasks}
      />
      <Column
        title="In progress"
        columnId="in-progress"
        headingColor="text-blue-200"
        tasks={tasks}
        setTasks={setTasks}
      />
      <Column
        title="Complete"
        columnId="done"
        headingColor="text-emerald-200"
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
};

export default Board;
