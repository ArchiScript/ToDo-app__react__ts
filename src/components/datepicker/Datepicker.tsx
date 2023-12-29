import AirDatepicker, { AirDatepickerOptions } from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import { useEffect, useRef } from "react";
import "./datepicker.scss";

export default function Datepicker(
  props: AirDatepickerOptions<HTMLElement> | undefined
) {
  let $input = useRef<HTMLInputElement | null>(null);
  let datepicker = useRef<AirDatepicker<HTMLElement> | null>(null);

  useEffect(() => {
    if ($input.current) {
      datepicker.current = new AirDatepicker($input.current, { ...props });
    }
    return () => {
      if (datepicker.current) {
        datepicker.current.destroy();
        datepicker.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (datepicker.current) {
      datepicker.current.update({ ...props });
    }
  }, [props]);

  return <input ref={$input} type="text" className="todo__detepicker" />;
}
