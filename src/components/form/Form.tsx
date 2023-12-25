import "./form.scss";
import Todos from "../todos/Todos";
import { useState, ChangeEvent, FormEvent } from "react";
import { ITodo } from "../todo/Todo";

export interface IForm {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export default function Form(props: IForm) {

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setTodos((currentTodos) => [...currentTodos, { title: inputValue }]);
    setInputValue("");
  };
  return (
    <>
      <form onSubmit={addTodo} className="form">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button className="form__button">add</button>
      </form>

    </>
  );
}
