import { ReactDatepicker } from "../datepicker/React-datepicker";
import "./filter.scss";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

interface FilterOptions {
  onSelect: (byProps: {
    date?: Date | Date[];
    id?: string;
    title?: string;
  }) => void;
  // changeFilterDate: (date: Date | undefined) => void;
}

export default function Filter(props: FilterOptions) {
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  console.log("filterOn", filterOn);
  console.log(startDate);

  useEffect(() => {
    if (filterOn) {
      if (startDate) {
        props.onSelect({ date: startDate as Date });
      }
    } else {
      props.onSelect({});
    }
  }, [startDate, endDate, filterOn]);

  function filterCheckboxHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    // setFilterOn(e.target.checked);
    setFilterOn((prev) => !prev);
  }

  const filterInitialDate = filterOn ? startDate : null;

  return (
    <div className="todo__filter">
      <div className="todo__filter-date">
        <label className="todo__filter-date-text">
          <input
            type="checkbox"
            checked={filterOn}
            onChange={filterCheckboxHandler}
          />
          filter by date:
        </label>
        <DatePicker
          selected={filterInitialDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          locale={ru}
          dateFormat="dd.MM.yyyy"
          selectsRange
        ></DatePicker>
      </div>
    </div>
  );
}