import "./form.scss";
import { IForm, ITodo } from "../types";
import Datepicker from "../datepicker/Datepicker";
import { ReactDatepicker } from "../datepicker/React-datepicker";
import { useAppStatesContext } from "../../appStatesContext";

export default function Form(props: IForm) {
  const appStates = useAppStatesContext();
  // const activeClass: string = props.visible ? "" : " inactive";
  // const activeToggle: string = props.visible ? " opened" : " closed";
  const activeClass: string = appStates.formVisible ? "" : " inactive";
  const activeToggle: string = appStates.formVisible ? " opened" : " closed";
  return (
    <>
      <section className="todo__add">
        <div
          className="todo-form__toggle"
          // onClick={(e) => props.changeVisible(e)}
          onClick={(e) => appStates.changeFormVisible(e)}
        >
          <span className={`todo-form__toggle-inner${activeToggle}`}></span>
        </div>
        {/* <form onSubmit={props.addTodos} className={`todo-form${activeClass}`}> */}
        <form
          onSubmit={appStates.addTodos}
          className={`todo-form${activeClass}`}
        >
          <ReactDatepicker
            // updateTodo={props.modifyCurrentTodo}
            updateTodo={appStates.modifyCurrentTodo}
          ></ReactDatepicker>
          <div className="todo-form__new-todo">
            <input
              className="todo-form__input"
              type="text"
              // value={props.inputValue}
              // onChange={props.handleInputChange}
              value={appStates.inputValue}
              onChange={appStates.handleInputChange}
            />
            <button className="todo-form__button"></button>
          </div>
        </form>
      </section>
    </>
  );
}
