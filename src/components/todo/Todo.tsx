import "./todo.scss";
import { ITodo } from "../types";
import formatDate from "../helpers/formatDate";
import { TodoContext } from "../../context";
import { useContext } from "react";

export default function Todo(props: ITodo) {
  function isLate(date: Date | Date[]): boolean {
    let late: boolean = false;
    if (Array.isArray(date)) {
      late = new Date() > date[1];
    } else {
      late = new Date() > date;
    }
    return late;
  }
 

  let todoStyle: string = props.completed ? ` completed` : "";
  todoStyle += isLate(props.date) ? ` late` : "";

  const currentTodo = useContext(TodoContext);

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
          <span className="todo__title-text">{props.title}</span>
          <span className="todo__date">
            {formatDate(props.date, "RU") ?? ""}
          </span>
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
