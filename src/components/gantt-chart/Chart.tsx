import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";
import { ITodo } from "../types";
import formatDate from "../helpers/formatDate";
import "./custom-chart.scss";
import { useAppStatesContext } from "../../appStatesContext";

export interface IChart {
  options: Gantt.Options;
}

export function Chart(props: IChart) {
  const appStates = useAppStatesContext();

  const $chartContaner = useRef<SVGSVGElement | null>(null);

  const chartInstance = useRef<Gantt | undefined>();

  function getTodoTasks(todos: ITodo[]): Gantt.Task[] {
    let tasks: Gantt.Task[] = [];

    if (todos.length > 0) {
      todos.forEach((todo) => {
        const taskDates: string[] = Array.isArray(todo.date)
          ? todo.date.map((d) => formatDate(d, "en-CA"))
          : [formatDate(todo.date, "en-CA")];

        tasks.push({
          id: todo.id,
          name: todo.title,
          start: taskDates[0],
          end: taskDates[1] ?? taskDates[0],
          progress: 0,
          dependencies: ""
        });
      });
    } else {
      tasks.push({
        id: "Task_0",
        name: "no tasks",
        start: formatDate(new Date(), "en-CA"),
        end: formatDate(new Date(), "en-CA"),
        progress: 0,
        dependencies: ""
      });
    }

    return tasks;
  }

  useEffect(() => {
    if ($chartContaner.current) {
      const tasks = getTodoTasks(appStates.filteredTodos);
      if (!chartInstance.current) {
        chartInstance.current = new Gantt(
          $chartContaner.current as SVGSVGElement,
          tasks,
          props.options
        ) as Gantt;
      } else {
        chartInstance.current.refresh(tasks);
      }
    }
  }, [props.options, appStates.filteredTodos, getTodoTasks]);

  return (
    <div className="chart-container">
      <svg id="gantt-1" ref={$chartContaner}></svg>
    </div>
  );
}
