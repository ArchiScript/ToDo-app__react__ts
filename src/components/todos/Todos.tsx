import "./todos.scss";
import Todo from "../todo/Todo";
import { ITodos, ITodo } from "../types";
import { listeners } from "process";

export default function Todos(props: ITodos) {
  const mapTodos = (arr: ITodo[]) => {
    if (arr.length > 0) {
      return arr.map((todo) => {
        if (todo.toggleChecked === undefined || todo.deleteTodo === undefined) {
          todo.deleteTodo = props.deleteTodo;
          todo.toggleChecked = props.toggleChecked;
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
      <ul className={props.className}>{mapTodos(props.todos)}</ul>
    </>
  );
}
