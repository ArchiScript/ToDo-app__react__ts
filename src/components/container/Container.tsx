import React from "react";
import "./container.scss";
import { ContainerProps } from "../types";

export default function Container(props: ContainerProps) {
  return (
    <>
      <div className="container">{props.children}</div>
    </>
  );
}
