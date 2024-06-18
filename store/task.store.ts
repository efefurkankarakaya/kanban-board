import { ITaskModel } from "@/models/task";
import { create } from "zustand";

interface TaskStore {
  task: ITaskModel;
  tasks: ITaskModel[];
  updateTask: (taskData: Partial<ITaskModel>) => void;
  updateTasks: (_tasks: ITaskModel[]) => void;
  resetTask: () => void;
}

const initialState: ITaskModel = {
  _id: "",
  _columnId: "",
  title: "",
  description: "",
  color: "blue",
  priority: "",
  tags: []
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
