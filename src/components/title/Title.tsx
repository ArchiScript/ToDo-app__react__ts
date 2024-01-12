import "./title.scss";
import { ITitle } from "../types";
import formatDate from "../helpers/formatDate";

export function Title(props: ITitle) {
  return (
    <>
      <div className="title">
        <h1>{props.txt}</h1>
        <h3 className="title__date">today: {formatDate(new Date(), "RU")}</h3>
      </div>
    </>
  );
}
