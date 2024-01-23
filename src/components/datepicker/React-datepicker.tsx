import { useEffect, useState } from "react";
import "./datepicker.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "../helpers/formatDate";
import { ITodo } from "../types";
import { useAppStatesContext } from "../../appStatesContext";

registerLocale("ru", ru);
interface ReactDP {
  updateTodo?: (newTodo: Partial<ITodo>) => void;
}

export function ReactDatepicker(props: ReactDP) {
  const appStatesContext = useAppStatesContext();

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  function getInitialDate(date: "start" | "end") {
    if (appStatesContext.currentTodo && appStatesContext.currentTodo.date) {
      const todoDate = appStatesContext.currentTodo.date;
      if (!Array.isArray(todoDate)) {
        return todoDate;
      } else {
        return date === "start" ? todoDate[0] : todoDate[1];
      }
    } else {
      if (date === "start") {
        return startDate;
      } else {
        return endDate;
      }
    }
  }

  useEffect(() => {
    function getDates(): Date | Date[] {
      if (!endDate) {
        return startDate as Date;
      } else {
        return [startDate, endDate] as Date[];
      }
    }
    if (props.updateTodo) {
      props.updateTodo({ date: getDates() });
    }
  }, [startDate, endDate]);

  if (appStatesContext.currentTodo) {
    console.log(appStatesContext.currentTodo.date);
  } else {
    console.log(" no date yet");
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={getInitialDate("start")}
      endDate={endDate}
      locale="ru"
      dateFormat="dd.MM.yyyy"
      selectsRange
    />
  );
}
