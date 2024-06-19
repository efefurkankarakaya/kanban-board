import { ITaskModel } from "@/models/task.model";
import { create } from "zustand";

export type TUpdateTask = (taskData: Partial<ITaskModel>) => void;
export type TUpdateTasks = (_tasks: ITaskModel[]) => void;

interface TaskStore {
  task: ITaskModel;
  tasks: ITaskModel[];
  updateTask: TUpdateTask;
  updateTasks: TUpdateTasks;
  resetTask: () => void;
}

const initialState: ITaskModel = {
  _id: "",
  _columnId: "",
  title: "",
  description: "",
  color: "blue",
  priority: "",
  tags: [],
  order: -1,
  createdAt: new Date(),
  editedAt: new Date(),
  completedAt: new Date()
};

const useTaskStore = create<TaskStore>((set) => ({
  task: initialState,
  tasks: [],
  updateTask: (taskData: Partial<ITaskModel>) => {
    set((state) => {
      const updatedTask = { ...state.task, ...taskData };

      // Updating the active task in the array
      const updatedTasks = [...state.tasks];
      const taskIndex = updatedTasks.findIndex((_task) => _task._id === updatedTask._id);
      updatedTasks[taskIndex] = updatedTask;

      return { task: updatedTask, tasks: updatedTasks };
    });
  },
  updateTasks: (newTasks: ITaskModel[]) => set((state) => ({ tasks: newTasks })),
  resetTask: () => set((state) => ({ ...state, task: { ...initialState } }))
}));

export default useTaskStore;
