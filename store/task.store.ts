import { ITaskModel } from "@/models/task";
import { create } from "zustand";

interface TaskStore {
  task: ITaskModel;
  updateTask: (taskData: Partial<ITaskModel>) => void;
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
  updateTask: (taskData: Partial<ITaskModel>) => set((state) => ({ task: { ...state.task, ...taskData } })),
  resetTask: () => set((state) => ({ ...state, task: { ...initialState } }))
}));

export default useTaskStore;
