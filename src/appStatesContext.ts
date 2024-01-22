import { createContext, useContext } from "react";
import { ITodo } from "./components/types";
import { IAppStates } from "./components/types";

export const AppStatesContext = createContext<IAppStates | undefined>(
  undefined
);

export function useAppStatesContext() {
  
  const appStates = useContext(AppStatesContext);

  if (appStates === undefined) {
    throw new Error("AppStatesContext is undefined");
  } else {
    Object.keys(appStates).forEach((key) => {
      if (key === undefined) {
        throw new Error(`AppStates.${key} is undefined`);
      }
    });
    return appStates;
  }
}
