import "./form.scss";
import { IForm } from "../types";
import Datepicker from "../datepicker/Datepicker";

export default function Form(props: IForm) {
  return (
    <>
      <form onSubmit={props.addTodos} className="form">
        <Datepicker
          range={true}
          startDate={new Date()}
          multipleDatesSeparator=" - "
        />
        <div className="form__new-todo">
          <input
            className="form__input"
            type="text"
            value={props.inputValue}
            onChange={props.handleInputChange}
          />
          <button className="form__button"></button>
        </div>
      </form>
    </>
  );
}
