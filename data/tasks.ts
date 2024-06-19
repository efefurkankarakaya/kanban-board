import { ITaskModel } from "@/models/task.model";

export type TaskColumnId = "backlog" | "todo" | "in-progress" | "done"

export const data: ITaskModel[] = [
  {
    _id: "1",
    _columnId: "backlog",
    title: "First task",
    description: "Buy ingredients for breakfast.",
    color: "pink",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "2",
    _columnId: "backlog",
    title: "Second task",
    description: "Buy ingredients for breakfast.",
    color: "blue",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "3",
    _columnId: "todo",
    title: "Third task",
    description: "Buy ingredients for breakfast.",
    color: "red",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "4",
    _columnId: "todo",
    title: "Fourth task",
    description: "Buy ingredients for breakfast.",
    color: "red",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "5",
    _columnId: "todo",
    title: "Fifth task",
    description: "Buy ingredients for breakfast.",
    color: "purple",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "6",
    _columnId: "todo",
    title: "Sixth task",
    description: "Buy ingredients for breakfast.",
    color: "purple",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "7",
    _columnId: "todo",
    title: "Seventh task",
    description: "Buy ingredients for breakfast.",
    color: "powder",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "8",
    _columnId: "in-progress",
    title: "Eighth task",
    description: "Buy ingredients for breakfast.",
    color: "red",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "9",
    _columnId: "in-progress",
    title: "Ninth task",
    description: "Buy ingredients for breakfast.",
    color: "blue",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "10",
    _columnId: "in-progress",
    title: "Tenth task",
    description: "Buy ingredients for breakfast.",
    color: "blue",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "11",
    _columnId: "in-progress",
    title: "Eleventh task",
    description: "Buy ingredients for breakfast.",
    color: "blue",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "12",
    _columnId: "done",
    title: "Twelfth task",
    description: "Buy ingredients for breakfast.",
    color: "green",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  },
  {
    _id: "13",
    _columnId: "done",
    title: "Thirteenth task",
    description: "Buy ingredients for breakfast.",
    color: "green",
    priority: "",
    tags: [],
    createdAt: new Date(),
    editedAt: new Date()
  }
];
