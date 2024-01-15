import { useState } from "react";
import "./datepicker.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "../helpers/formatDate";
import { ITodo } from "../types";

registerLocale("ru", ru);
interface ReactDP {
  updateTodo: (newTodo: Partial<ITodo>) => void;
}

export function ReactDatepicker(props: ReactDP) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    props.updateTodo({ date: dates as Date[] });
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      locale="ru"
      dateFormat="dd.MM.yyyy"
      selectsRange
    />
  );
}