import "./form.scss";
import { IForm, ITodo } from "../types";
import Datepicker from "../datepicker/Datepicker";
import { ReactDatepicker } from "../datepicker/React-datepicker";

export default function Form(props: IForm) {
  const activeClass: string = props.visible ? "" : " inactive";
  const activeToggle: string = props.visible ? " opened" : " closed";
  return (
    <>
      <section className="todo__add">
        <div
          className="todo-form__toggle"
          onClick={(e) => props.changeVisible(e)}
        >
          <span className={`todo-form__toggle-inner${activeToggle}`}></span>
        </div>
        <form onSubmit={props.addTodos} className={`todo-form${activeClass}`}>
          <ReactDatepicker
            updateTodo={props.modifyCurrentTodo}
          ></ReactDatepicker>
          <div className="todo-form__new-todo">
            <input
              className="todo-form__input"
              type="text"
              value={props.inputValue}
              onChange={props.handleInputChange}
            />
            <button className="todo-form__button"></button>
          </div>
        </form>
      </section>
    </>
  );
}
