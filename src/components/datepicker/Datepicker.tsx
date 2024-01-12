import AirDatepicker, { AirDatepickerOptions } from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import { useEffect, useRef, useState } from "react";
import "./datepicker.scss";
import formatDate from "../helpers/formatDate";

export default function Datepicker(
  props: AirDatepickerOptions<HTMLElement> | undefined
) {
  let $input = useRef<HTMLInputElement | null>(null);
  let datepicker = useRef<AirDatepicker<HTMLElement> | null>(null);
  const [initialDate, setInitialDate] = useState<Date>();

  useEffect(() => {
    setInitialDate(new Date());
  }, []);

  useEffect(() => {
    if ($input.current) {
      datepicker.current = new AirDatepicker($input.current, {
        ...props
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
      datepicker.current.update({ ...props });
    }
  }, [props]);

  return (
    <input
      ref={$input}
      value={formatDate(initialDate as Date, "RU")}
      type="text"
      className="todo__detepicker"
    />
  );
}
