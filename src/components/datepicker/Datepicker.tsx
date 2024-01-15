import AirDatepicker, { AirDatepickerOptions } from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import { useEffect, useRef, useState } from "react";
import "./datepicker.scss";
import formatDate from "../helpers/formatDate";

interface datepickerProps {
  airdatepicker: AirDatepickerOptions<HTMLElement> | undefined;
  modifyTodoDate: Function;
}

export default function Datepicker(props: datepickerProps) {
  let $input = useRef<HTMLInputElement | null>(null);
  let datepicker = useRef<AirDatepicker<HTMLElement> | null>(null);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if ($input.current) {
      datepicker.current = new AirDatepicker($input.current, {
        ...props.airdatepicker
      });
    }

    return () => {
      if (datepicker.current) {
        datepicker.current.destroy();
        datepicker.current = null;
      }
    };
  }, [props]);

  useEffect(() => {
    if (datepicker.current) {
      datepicker.current.update({ ...props.airdatepicker });
      setDate(datepicker.current.viewDate);
    }
  }, [props]);

  return (
    <input
      ref={$input}
      value={formatDate(date as Date, "RU")}
      type="text"
      className="todo__detepicker"
    />
  );
}
