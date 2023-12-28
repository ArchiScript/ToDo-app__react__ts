import React, { useEffect } from "react";
import "./App.scss";
import { Title } from "./components/title/Title";
import Form from "./components/form/Form";
import Container from "./components/container/Container";
import Todos from "./components/todos/Todos";
import { useState } from "react";
import { ITodo } from "./components/types";
import { ChangeEvent, FormEvent } from "react";

function App() {
  const [todos, setTodos] = useState<ITodo[]>(getTodoFromStorage());

  function getTodoFromStorage(): ITodo[] {
    if (localStorage.getItem("TODOS") !== null) {
      const storageTodos: ITodo[] = JSON.parse(
        localStorage.getItem("TODOS") as string
      );
      return storageTodos;
    }
    return [];
  }

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  function toggleChecked(id: string, completed: boolean) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTodos = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue && inputValue.trim() !== "") {
      setTodos((currentTodos) => [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: inputValue,
          completed: false,
          toggleChecked,
          deleteTodo
        }
      ]);
      setInputValue("");
    }
  };
  return (
    <>
      <Container>
        <Title txt="Todo App" />
        <Form
          todos={todos}
          addTodos={addTodos}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
        <Todos
          className="todo__list"
          todos={todos}
          toggleChecked={toggleChecked}
          deleteTodo={deleteTodo}
        />
      </Container>
    </>
  );
}

export default App;
