import Todo, { ITodo } from "../todo/Todo";
interface ITodos {
  className: string;
  todos: ITodo[];
}

export default function Todos(props: ITodos) {
  const mapTodos = (arr: ITodo[]) => {
    return arr.map((todo, i) => {
      return <li>{<Todo title={todo.title} />}</li>;
    });
  };

  return (
    <>
      <ol className={props.className}>{mapTodos(props.todos)}</ol>
    </>
  );
}
