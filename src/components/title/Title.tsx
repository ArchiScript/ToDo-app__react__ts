import "./title.scss";
import { ITitle } from "../types";
export function Title(props: ITitle) {
  return (
    <>
      <div className="title">
        <h1>{props.txt}</h1>
      </div>
    </>
  );
}
