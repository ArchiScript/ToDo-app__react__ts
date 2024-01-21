import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";
import { ITodo } from "../types";
import formatDate from "../helpers/formatDate";
import "./custom-chart.scss";

export interface GanttProps {
  todos: ITodo[];
  options: Gantt.Options;
}

export function Chart(props: GanttProps) {
  const $chartContaner = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Gantt>();

  function getTodoTasks(todos: ITodo[]): Gantt.Task[] {
    let tasks: Gantt.Task[] = [];

    todos.forEach((todo) => {
      const taskDates: string[] = Array.isArray(todo.date)
        ? todo.date.map((d) => formatDate(d, "en-CA"))
        : [formatDate(todo.date, "en-CA")];

      tasks.push({
        id: todo.id,
        name: todo.title,
        start: taskDates[0],
        end: taskDates[1] ?? taskDates[0],
        progress: 20,
        dependencies: ""
      });
    });
    return tasks;
  }
  console.log(getTodoTasks(props.todos));
  useEffect(() => {
    if ($chartContaner.current) {
      chartInstance.current = new Gantt(
        $chartContaner.current,
        getTodoTasks(props.todos),
        props.options
      );
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current = undefined;
      }
    };
  }, [props]);

  return <div className="todo__chart" ref={$chartContaner}></div>;
}
