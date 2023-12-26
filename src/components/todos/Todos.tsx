import Todo from "../todo/Todo";
import { ITodos, ITodo } from "../types";

export default function Todos(props: ITodos) {
  const mapTodos = (arr: ITodo[]) => {
    return arr.map((todo) => {
      return <li key={todo.id}>{<Todo {...todo} />}</li>;
    });
  };
  return (
    <>
      <ul className={props.className}>{mapTodos(props.todos)}</ul>
    </>
  );
}
