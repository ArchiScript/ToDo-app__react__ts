import { createContext } from "react";
import { ITodo } from "./components/types";

export const TodoContext = createContext<ITodo | undefined>(undefined);
