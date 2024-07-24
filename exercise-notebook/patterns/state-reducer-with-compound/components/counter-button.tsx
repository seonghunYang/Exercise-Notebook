import React from "react";
import { useCounterReducerContext } from "../user-counter-reducer-context";

interface CounterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  countType: "increment" | "decrement";
}

export function CounterButton({
  countType,
  onClick,
  ...others
}: CounterButtonProps) {
  const [_, dispatch] = useCounterReducerContext();

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    if (countType === "increment") {
      dispatch({ type: "INCREMENT" });
    } else {
      dispatch({ type: "DECREMENT" });
    }

    onClick?.(event);
  };

  return (
    <button {...others} onClick={handleButtonClick}>
      {countType === "increment" ? "+" : "-"}
    </button>
  );
}
