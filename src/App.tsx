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
import {
  hasCommonDate,
  hasCommonDates
} from "./components/helpers/compareDates";
import { getDatesInRange } from "./components/helpers/getDatesInRange";
import { dateReviver } from "./components/helpers/dateReviver";
import { TodoContext } from "./context";
import { FilterObject } from "./components/types";

function App() {
  const [todoStorage, setTodoStorage] = useState<ITodo[]>(getTodoFromStorage());
  const [inputValue, setInputValue] = useState("");
  const [currentTodo, setCurrentTodo] = useState<ITodo | undefined>();
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>(
    getFilteredTodos({})
  );
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [commonFilterObj, setCommonFilterObj] = useState<FilterObject>({});

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

  function populateFilterObject(filterObject: FilterObject): void {
    setCommonFilterObj(filterObject);
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
    filterTodos(commonFilterObj);
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

  function matchDates(dates: {
    filterDate: Date | Date[];
    todoDate: Date | Date[];
  }): boolean {
    if (dates === undefined) {
      return false;
    }
    const filterDate = Array.isArray(dates.filterDate)
      ? dates.filterDate
      : [dates.filterDate];
    const todoDate = Array.isArray(dates.todoDate)
      ? dates.todoDate
      : [dates.todoDate];

    const filterDatesRange = getDatesInRange(filterDate);
    const todoDatesRange = getDatesInRange(todoDate);

    if (!Array.isArray(todoDate)) {
      return hasCommonDate(filterDatesRange, todoDate);
    } else {
      return hasCommonDates(filterDatesRange, todoDatesRange);
    }
  }

  function getFilteredTodos(byProps: {
    date?: Date | Date[];
    completed?: boolean;
    showCompleted?: boolean;
    title?: string;
  }) {
    let resultedTodos: ITodo[] = [];

    if (byProps.date) {
      resultedTodos = todoStorage.filter((todo) => {
        const todoDate = Array.isArray(todo.date) ? todo.date : [todo.date];

        return matchDates({
          todoDate: todoDate,
          filterDate: byProps.date as Date | Date[]
        });
      });
    } else {
      resultedTodos = todoStorage;
    }

    if (byProps.showCompleted === false) {
      resultedTodos = resultedTodos.filter((todo) => todo.completed === false);
    }

    return resultedTodos;
  }

  function changeFormVisible() {
    setFormVisible((prev) => !prev);
  }

  return (
    <>
      <Container>
        <Title txt="Todo App" />
        <Filter
          onSelect={filterTodos}
          populateFilterObject={populateFilterObject}
        ></Filter>
        <TodoContext.Provider value={currentTodo}>
          <Form
            changeVisible={changeFormVisible}
            visible={formVisible}
            modifyCurrentTodo={modifyCurrentTodo}
            addTodos={addTodos}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
          <Todos
            className="todo__list"
            todos={filteredTodos}
            toggleChecked={toggleChecked}
            deleteTodo={deleteTodo}
          />
        </TodoContext.Provider>
      </Container>
    </>
  );
}

export default App;
