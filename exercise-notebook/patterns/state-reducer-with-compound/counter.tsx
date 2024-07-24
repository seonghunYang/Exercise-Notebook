import React from "react";
import { CounterButton, CounterInput } from "./components";
import { CounterAction, CounterReducer } from "./user-counter-reducer-context";
import { CounterProvider } from "./counter-provider";

export type OuterReducer = (
  state: number,
  action: CounterAction,
  next: typeof CounterReducer
) => number;

interface CounterProps {
  reducer?: OuterReducer;
}

export default function Counter({
  reducer,
  children,
}: React.PropsWithChildren<CounterProps>) {
  return <CounterProvider reducer={reducer}>{children}</CounterProvider>;
}

Counter.Button = CounterButton;
Counter.Input = CounterInput;
