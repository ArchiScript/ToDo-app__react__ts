import "./todo.scss";
import { ITodo } from "../types";

export default function Todo(props: ITodo) {
  const todoStyle: string = props.completed ? ` completed` : "";
  return (
    <>
      <div className="todo">
        <label className={`todo__title${todoStyle}`}>
          <input
            type="checkbox"
            className="todo__chb"
            checked={props.completed}
            onChange={(e) => props.toggleChecked(props.id, e.target.checked)}
          />
          {props.title}
        </label>

        <button
          onClick={() => props.deleteTodo(props.id)}
          className="todo__delete"
        >
          delete
        </button>
      </div>
    </>
  );
}
