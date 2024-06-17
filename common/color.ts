export enum TaskColorClassName {
  red = "bg-task-red",
  green = "bg-task-green",
  blue = "bg-task-blue",
  pink = "bg-task-pink",
  purple = "bg-task-purple",
  orange = "bg-task-orange",
  powder = "bg-task-powder"
}

export type TaskColor = keyof typeof TaskColorClassName;
