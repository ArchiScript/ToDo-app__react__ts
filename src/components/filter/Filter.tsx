import { ReactDatepicker } from "../datepicker/React-datepicker";
import "./filter.scss";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import type { FilterObject } from "../../components/types";

interface FilterOptions {
  onSelect: (byProps: FilterObject) => void;
  populateFilterObject: (obj: FilterObject) => void;
}

export default function Filter(props: FilterOptions) {
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterByDateOn, setFilterByDateOn] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [filterObject, setFilterObject] = useState<FilterObject>({});

  const onFilterDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  console.log(filterObject);

  useEffect(() => {
    let date: Date[] | Date;

    if (startDate && !endDate) {
      date = startDate;
    } else if (startDate && endDate) {
      date = [startDate, endDate];
    }

    if (filterByDateOn) {
      setFilterObject((current) => ({
        ...current,
        date
      }));
    } else {
      setFilterObject((current) => ({
        ...current,
        date: undefined
      }));
    }
  }, [startDate, endDate, filterByDateOn]);

  useEffect(() => {
    setFilterObject((current) => ({ ...current, showCompleted }));
  }, [showCompleted]);

  useEffect(() => {
    props.onSelect(filterObject as FilterObject);
    props.populateFilterObject(filterObject as FilterObject);
  }, [filterObject]);

  function filterByDateHandler(): void {
    setFilterByDateOn((prev) => !prev);
  }

  function filterCompletedHandler(): void {
    setShowCompleted((prev) => !prev);
  }

  const filterInitialDate = filterByDateOn ? startDate : null;

  return (
    <div className="todo__filter">
      <div className="todo__filter-date">
        <label className="todo__filter-chbx-label">
          <input
            className="todo__filter-chbx"
            type="checkbox"
            checked={filterByDateOn}
            onChange={filterByDateHandler}
          />
          filter by date:
        </label>
        <DatePicker
          selected={filterInitialDate}
          onChange={onFilterDateChange}
          startDate={startDate}
          endDate={endDate}
          locale={ru}
          dateFormat="dd.MM.yyyy"
          selectsRange
        ></DatePicker>
      </div>

      <div className="todo__filter-completed">
        <label>
          <input
            className="todo__filter-completed-chbx"
            type="checkbox"
            checked={showCompleted}
            onChange={filterCompletedHandler}
          ></input>
          show completed
        </label>
      </div>
    </div>
  );
}
