import React from "react";
import "./App.scss";
import { Title } from "./components/title/Title";
import Form from "./components/form/Form";
import Container from "./components/container/Container";
import Todos from "./components/todos/Todos";
import { useState } from "react";
import { ITodo } from "./components/todo/Todo";

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  return (
    <>
      <Container>
        <Title txt="ToDo application" />
        <Form todos={todos} setTodos={setTodos} />
        <Todos className="todo__list" todos={todos} />
      </Container>
    </>
  );
}

export default App;
