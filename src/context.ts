import { createContext } from "react";
import { ITodo } from "./components/types";

export const TodoContext = createContext<ITodo | ITodo[] | undefined>(
  undefined
);
