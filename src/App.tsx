import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Title } from "./components/title/Title";
import Form from "./components/form/Form";
import Container from "./components/container/Container";
import Todos from "./components/todos/Todos";
import { useState } from "react";
import { ITodo } from "./components/types";
import { ChangeEvent, FormEvent } from "react";
// import Datepicker from "./components/datepicker/Datepicker";

import { TodoContext } from "./context";

function App() {
  const [todos, setTodos] = useState<ITodo[]>(getTodoFromStorage());
  const [inputValue, setInputValue] = useState("");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentTodo, setCurrentTodo] = useState<ITodo | undefined>(
    createNewTodo()
  );

  function getTodoFromStorage(): ITodo[] {
    if (localStorage.getItem("TODOS") !== null) {
      const storageTodos: ITodo[] = JSON.parse(
        localStorage.getItem("TODOS") as string
      );
      return storageTodos;
    }
    return [];
  }

  function createNewTodo(): ITodo {
    const newTodo = {
      id: crypto.randomUUID(),
      title: inputValue,
      completed: false,
      date: currentDate,
      toggleChecked,
      deleteTodo
    };
    return newTodo;
  }

  function modifyCurrentTodo(todoPropertyObj: Partial<ITodo>): void {
    setCurrentTodo((prevTodo) => ({
      ...(prevTodo as ITodo),
      ...todoPropertyObj
    }));
  }

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  console.log(todos);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    modifyCurrentTodo({ title: e.target.value });
  };

  function changeDate(date: Date) {
    setCurrentDate(date);
  }

  const addTodos = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue && inputValue.trim() !== "") {
      setTodos((currentTodos) => [...currentTodos, currentTodo as ITodo]);
      setInputValue("");
    }
  };

  return (
    <>
      <Container>
        <Title txt="Todo App" />
        <TodoContext.Provider value={currentTodo}>
          <Form
            modifyCurrentTodo={modifyCurrentTodo}
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
        </TodoContext.Provider>
      </Container>
    </>
  );
}

export default App;
