import { ChangeEvent, FormEvent } from "react";

export interface ContainerProps {
  children: React.ReactNode;
}

export interface ITitle {
  txt: string;
}
export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  date: Date | Date[];
  toggleChecked(id: string, completed: boolean): void;
  deleteTodo(id: string): void;
}

export interface ITodos {
  className: string;
  todos: ITodo[];
  toggleChecked(id: string, completed: boolean): void;
  deleteTodo(id: string): void;
}
export interface IForm {
  modifyCurrentTodo: (newTodo: Partial<ITodo>) => void;
  inputValue: string;
  todos: ITodo[];
  addTodos: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
