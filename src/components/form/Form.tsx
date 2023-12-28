import "./form.scss";
import { IForm } from "../types";

export default function Form(props: IForm) {
  return (
    <>
      <form onSubmit={props.addTodos} className="form">
        <input
          type="text"
          value={props.inputValue}
          onChange={props.handleInputChange}
        />
        <button className="form__button"></button>
      </form>
    </>
  );
}
