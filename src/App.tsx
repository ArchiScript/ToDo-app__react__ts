import React, { useEffect } from "react";
import "./App.scss";
import { Title } from "./components/title/Title";
import Form from "./components/form/Form";
import Container from "./components/container/Container";
import Todos from "./components/todos/Todos";
import { useState } from "react";
import { ITodo } from "./components/types";
import { ChangeEvent, FormEvent } from "react";
import formatDate from "./components/helpers/formatDate";
import Filter from "./components/filter/Filter";

import { TodoContext } from "./context";

function App() {
  const [todoStorage, setTodoStorage] = useState<ITodo[]>(getTodoFromStorage());
  const [inputValue, setInputValue] = useState("");
  const [currentTodo, setCurrentTodo] = useState<ITodo | undefined>();
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>(
    getFilteredTodos({})
  );
  // const [filterDate, setFilterDate] = useState<Date | undefined>();

  useEffect(() => {
    function createNewTodo(): ITodo {
      const newTodo = {
        id: crypto.randomUUID(),
        title: inputValue,
        completed: false,
        date: new Date(),
        toggleChecked,
        deleteTodo
      };

      return newTodo;
    }
    setCurrentTodo(createNewTodo());
  }, [todoStorage]);

  function dateReviver(
    date: string | Date | [string | Date, string | Date]
  ): Date | Date[] {
    if (Array.isArray(date)) {
      return date.map((d) => new Date(d));
    } else {
      return new Date(date);
    }
  }

  function getTodoFromStorage(): ITodo[] {
    if (localStorage.getItem("TODOS") !== null) {
      const storageTodos: ITodo[] = JSON.parse(
        localStorage.getItem("TODOS") as string,
        (key, value: string | Date | [string | Date, string | Date]) => {
          if (key === "date") {
            return dateReviver(value);
          }
          return value;
        }
      );
      return storageTodos;
    }
    return [];
  }

  function modifyCurrentTodo(todoPropertyObj: Partial<ITodo>): void {
    setCurrentTodo((prevTodo) => ({
      ...(prevTodo as ITodo),
      ...todoPropertyObj
    }));
  }

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todoStorage));
  }, [todoStorage]);

  function toggleChecked(id: string, completed: boolean) {
    setTodoStorage((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id: string) {
    setTodoStorage((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  useEffect(() => {
    filterTodos({});
  }, [todoStorage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    modifyCurrentTodo({ title: e.target.value });
  };

  const addTodos = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue && inputValue.trim() !== "") {
      setTodoStorage((currentTodos) => [...currentTodos, currentTodo as ITodo]);
      setInputValue("");
    }
  };

  function filterTodos(byProps: {
    date?: Date | Date[];
    id?: string;
    title?: string;
  }) {
    setFilteredTodos(() => {
      return getFilteredTodos(byProps);
    });
  }

  function getFilteredTodos(byProps: {
    date?: Date | Date[];
    id?: string;
    title?: string;
  }) {
    if ("date" in byProps) {
      return todoStorage.filter((todo) => {
        if (Array.isArray(todo.date) && Array.isArray(byProps.date)) {
          let d = todo.date[0] as Date,
            dp = byProps.date[0] as Date;
          return formatDate(d, "RU") === formatDate(dp, "RU");
        } else {
          let d = todo.date as Date,
            dp = byProps.date as Date;
          return formatDate(d, "RU") === formatDate(dp, "RU");
        }
      });
    } else {
      return todoStorage;
    }
  }

  // function ChangeFilterDate(date: Date | undefined) {
  //   setFilterDate(date);
  // }

  return (
    <>
      <Container>
        <Title txt="Todo App" />
        <Filter
          onSelect={filterTodos}
          // changeFilterDate={ChangeFilterDate}
        ></Filter>
        <TodoContext.Provider value={currentTodo}>
          <Form
            modifyCurrentTodo={modifyCurrentTodo}
            addTodos={addTodos}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
          <Todos
            className="todo__list"
            todos={filteredTodos.length > 0 ? filteredTodos : todoStorage}
            toggleChecked={toggleChecked}
            deleteTodo={deleteTodo}
          />
        </TodoContext.Provider>
      </Container>
    </>
  );
}

export default App;
