import React, { useState } from "react";
import { CounterContext } from "./use-counter-context";
import { CounterButton, CounterInput } from "./components";

export default function Counter({ children }: React.PropsWithChildren) {
  const [count, setCount] = useState(0);

  const onIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const onDecrement = () => {
    setCount((prev) => prev - 1);
  };

  const onChange = (count: number) => {
    setCount(count);
  };

  return (
    <CounterContext.Provider
      value={{
        count,
        onIncrement,
        onDecrement,
        onChange,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

Counter.Button = CounterButton;
Counter.Input = CounterInput;
