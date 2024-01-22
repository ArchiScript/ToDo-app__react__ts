import "./todo.scss";
import { ITodo } from "../types";
import formatDate from "../helpers/formatDate";
import { TodoContext } from "../../context";
import { useContext, useState } from "react";
import "../../assets/fonts/font-style.css";
import ChangeForm from "../form/ChangeForm";
import { AppStatesContext } from "../../appStatesContext";
import { useAppStatesContext } from "../../appStatesContext";

// const appStatesContext = useAppStatesContext();

export default function Todo(props: ITodo) {
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const appStatesContext = useAppStatesContext();

  function onEditHandler() {
    setEditFormVisible((prev) => !prev);
    appStatesContext.resetCurrentTodo(props);
  }

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
  todoStyle += isLate(props.date) && !props.completed ? ` late` : "";
  let todoFormStyle: string = editFormVisible
    ? ` edit-form-visible`
    : "edit-form-hidden";

  console.log(appStatesContext.currentTodo);
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
        <div className="todo__change">
          <div className="todo__edit" onClick={onEditHandler}>
            <div className="icon-pencil"></div>
          </div>
          <button
            onClick={() => props.deleteTodo(props.id)}
            className="todo__delete"
          >
            delete
          </button>
        </div>
      </div>
      <div className="todo__change-form">
        <ChangeForm formVisible={editFormVisible}></ChangeForm>
      </div>
    </>
  );
}
