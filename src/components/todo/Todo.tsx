export interface ITodo {
  title: string;
}
export default function Todo(props: ITodo) {
  return (
    <>
      <div className="todo">
        <div className="todo__title">{props.title}</div>
      </div>
    </>
  );
}
