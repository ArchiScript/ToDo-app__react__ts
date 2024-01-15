import "./form.scss";
import { IForm, ITodo } from "../types";
import Datepicker from "../datepicker/Datepicker";
import { ReactDatepicker } from "../datepicker/React-datepicker";

export default function Form(props: IForm) {
  return (
    <>
      <form onSubmit={props.addTodos} className="todo-form">
        {/* <Datepicker
          airdatepicker={{
            range: true,
            multipleDatesSeparator: " - ",
            onSelect: ({ date, datepicker }) => {
              props.modifyCurrentTodo({ date: date });
              datepicker.selectDate(date);
            },
            dateFormat(date) {
              return date.toLocaleString("RU", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
              });
            }
          }}
          modifyTodoDate={props.modifyCurrentTodo}
        /> */}

        <ReactDatepicker updateTodo={props.modifyCurrentTodo}></ReactDatepicker>
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
    </>
  );
}
