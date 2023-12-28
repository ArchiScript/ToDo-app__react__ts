import React from "react";
import "./container.scss";
import { ContainerProps } from "../types";

export default function Container(props: ContainerProps) {
  return (
    <>
      <div className="todoapp">{props.children}</div>
    </>
  );
}
