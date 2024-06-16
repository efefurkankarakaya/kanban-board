import { ITaskModel } from "@/models/task";

export const data: ITaskModel[] = [
  {
    _id: "1",
    _columnId: "backlog",
    title: "First task",
    description: "Buy ingredients for breakfast.",
    color: "",
    priority: "",
    tags: []
  },
  {
    _id: "2",
    _columnId: "backlog",
    title: "Second task",
    description: "Buy ingredients for breakfast.",
    color: "",
    priority: "",
    tags: []
  },
  { _id: "3", _columnId: "backlog", title: "Third task", description: "Buy ingredients for breakfast.", color: "", priority: "", tags: [] },
  {
    _id: "4",
    _columnId: "backlog",
    title: "Fourth task",
    description: "Buy ingredients for breakfast.",
    color: "",
    priority: "",
    tags: []
  },
  { _id: "5", _columnId: "todo", title: "Fifth task", description: "Buy ingredients for breakfast.", color: "", priority: "", tags: [] },
  { _id: "6", _columnId: "todo", title: "Sixth task", description: "Buy ingredients for breakfast.", color: "", priority: "", tags: [] },
  { _id: "7", _columnId: "todo", title: "Seventh task", description: "Buy ingredients for breakfast.", color: "", priority: "", tags: [] },
  { _id: "8", _columnId: "todo", title: "Eighth task", description: "Buy ingredients for breakfast.", color: "", priority: "", tags: [] },
  {
    _id: "9",
    _columnId: "in-progress",
    title: "Ninth task",
    description: "Buy ingredients for breakfast.",
    color: "",
    priority: "",
    tags: []
  },
  { _id: "10", _columnId: "done", title: "Tenth task", description: "Buy ingredients for breakfast.", color: "", priority: "", tags: [] }
];
