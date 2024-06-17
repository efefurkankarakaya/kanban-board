import { DragEvent, useMemo, useState } from "react";
import DropIndicator from "./DropIndicator";
import { ITaskModel } from "@/models/task";
import Task from "./Task";
import CreateTask from "./CreateTask";

type Indicator = {
  offset: number;
  element: HTMLDivElement;
};

const getIndicators = (columnId: string): HTMLDivElement[] => {
  const query = `[data-column="${columnId}"]`;
  return Array.from(document.querySelectorAll(query));
};

const clearHighlights = (columnId: string, elements: HTMLDivElement[] | null = null) => {
  const indicators = elements || getIndicators(columnId);

  indicators.forEach((indicator) => {
    indicator.style.opacity = "0";
  });
};

const highlightIndicator = (e: DragEvent<HTMLDivElement>, columnId: string) => {
  const indicators = getIndicators(columnId);

  clearHighlights(columnId, indicators);

  const indicator = getNearestIndicator(e, indicators);

  indicator.element.style.opacity = "1";
};

const getNearestIndicator = (e: DragEvent<HTMLDivElement>, indicators: HTMLDivElement[]): Indicator => {
  const DISTANCE_OFFSET = 50;

  const indicator = indicators.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();

      const offset = e.clientY - (box.top + DISTANCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1]
    }
  );

  console.log(indicator.element);

  return indicator;
};

interface Props {
  title: string;
  columnId: string;
  tasks: ITaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<ITaskModel[]>>;
}

const Column = ({ title, tasks, columnId, setTasks }: Props) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, task: ITaskModel) => {
    e.dataTransfer.setData("taskId", task._id);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("taskId");

    setActive(false);
    clearHighlights(columnId, null);

    const indicators = getIndicators(columnId);
    const { element } = getNearestIndicator(e, indicators);

    console.log(element.dataset);
    const before = element.dataset.before || "-1";

    if (before !== taskId) {
      let copy = [...tasks];

      let transfer = copy.find((task) => task._id === taskId);
      if (!transfer) {
        return;
      }

      transfer = { ...transfer, _columnId: columnId };
      copy = copy.filter((task) => task._id !== taskId);

      const isMovingToBottomEndOfColumn = before === "-1";

      if (isMovingToBottomEndOfColumn) {
        copy.push(transfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el._id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, transfer);
      }

      setTasks(copy);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e, columnId);

    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights(columnId, null);
    setActive(false);
  };

  const filteredTasks = useMemo(() => tasks.filter((task) => task._columnId === columnId), [tasks, columnId]);

  return (
    <div className={`w-56 shrink-0 h-fit p-4 rounded-lg ${active ? "bg-task-list" : "bg-task-list/50"}`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium text-neutral-200`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">{filteredTasks.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full transition-colors`}
      >
        {filteredTasks.map((task) => {
          return (
            <Task
              key={task._id}
              data={task}
              handleDragStart={handleDragStart}
            />
          );
        })}
        <DropIndicator
          beforeId={null}
          columnId={columnId}
        />
      </div>
      <CreateTask
        columnId={columnId}
        setTasks={setTasks}
      />
    </div>
  );
};

export default Column;
