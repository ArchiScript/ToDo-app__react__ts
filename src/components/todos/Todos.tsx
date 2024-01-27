import "./todos.scss";
import Todo from "../todo/Todo";
import { ITodos, ITodo } from "../types";
import { useAppStatesContext } from "../../appStatesContext";

export default function Todos(props: ITodos) {
  const appState = useAppStatesContext();

  const mapTodos = (arr: ITodo[]) => {
    if (arr.length > 0) {
      return arr.map((todo) => {
        if (todo.toggleChecked === undefined || todo.deleteTodo === undefined) {
          todo.deleteTodo = appState.deleteTodo;
          todo.toggleChecked = appState.toggleChecked;
          return <li key={todo.id}>{<Todo {...todo} />}</li>;
        }
        return <li key={todo.id}>{<Todo {...todo} />}</li>;
      });
    } else {
      return <li className="no-todos">No todos</li>;
    }
  };

  return (
    <>
      <ul className="todo__list">{mapTodos(appState.filteredTodos)}</ul>
    </>
  );
}
