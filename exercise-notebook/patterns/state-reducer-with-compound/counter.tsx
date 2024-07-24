import React from "react";
import { CounterButton, CounterInput } from "./components";
import { CounterProvider } from "./user-counter-reducer-context";

export default function Counter({ children }: React.PropsWithChildren) {
  return <CounterProvider>{children}</CounterProvider>;
}

Counter.Button = CounterButton;
Counter.Input = CounterInput;
