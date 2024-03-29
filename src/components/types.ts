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
  // className: string;
  // todos: ITodo[];
  // toggleChecked(id: string, completed: boolean): void;
  // deleteTodo(id: string): void;
}
export interface IForm {}

export interface IChangeForm {
  formVisible: boolean;
}

export type FilterObject = {
  date?: Date | Date[];
  title?: string;
  showCompleted?: boolean;
};
export type ChangedTodoObject = {
  title?: string;
  date?: Date | Date[];
  completed?: boolean;
};

export interface IAppStates {
  inputValue: string;
  currentTodo: ITodo;
  filteredTodos: ITodo[];
  todoStorage: ITodo[];
  formVisible: boolean;
  commonFilterObj: FilterObject;
  filterTodos(byProps: FilterObject): void;
  populateFilterObject(filterObject: FilterObject): void;
  modifyCurrentTodo(todoPropertyObj: Partial<ITodo>): void;
  addTodos: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleChecked(id: string, completed: boolean): void;
  deleteTodo(id: string): void;
  changeFormVisible: (e: React.MouseEvent<HTMLElement>) => void;
  resetCurrentTodo(todo: ITodo): void;
  modifyTodoStorage(): void;
}
