import "./form.scss";
import { IForm } from "../types";

export default function Form(props: IForm) {
  // const [inputValue, setInputValue] = useState("");

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  // const addTodo = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   props.setTodos((currentTodos) => [
  //     ...currentTodos,
  //     {
  //       id: crypto.randomUUID(),
  //       title: inputValue,
  //       canceled: false,
  //       completed: false
  //     }
  //   ]);
  //   setInputValue("");
  // };
  return (
    <>
      <form onSubmit={props.addTodos} className="form">
        <input
          type="text"
          value={props.inputValue}
          onChange={props.handleInputChange}
        />
        <button className="form__button">add</button>
      </form>
    </>
  );
}
