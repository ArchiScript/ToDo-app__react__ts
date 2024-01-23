import "./form.scss";
import { IChangeForm, IForm, ITodo } from "../types";
import { ReactDatepicker } from "../datepicker/React-datepicker";
import { useAppStatesContext } from "../../appStatesContext";
import { ChangedTodoObject } from "../types";
import { useState } from "react";

export default function ChangeForm(props: IChangeForm) {
  const [changedTodoObj, setChangedTodoObj] = useState<ChangedTodoObject>({});

  const appContext = useAppStatesContext();

  const activeClass: string = props.formVisible ? " active" : " inactive";
  // const activeToggle: string = props.formVisible ? " opened" : " closed";

  // function updateChangedTodo(todo: Partial<ITodo>) {
  //   setChangedTodoObj(todo);
  // }

  return (
    <>
      <section className="todo__change">
        {/* <div
          className="todo-form__toggle"
          onClick={() => appContext.changeFormVisible}
        >
          <span className={`todo-form__toggle-inner${activeToggle}`}></span>
        </div> */}
        <form
          onSubmit={appContext.modifyTodoStorage}
          className={`todo-form${activeClass}`}
        >
          <ReactDatepicker
            updateTodo={appContext.modifyCurrentTodo}
          ></ReactDatepicker>
          <div className="todo-form__change-todo">
            <input
              className="todo-form__input"
              type="text"
              value={appContext.inputValue}
              onChange={appContext.handleInputChange}
            />
            <button className="todo-form__button"></button>
          </div>
        </form>
      </section>
    </>
  );
}
