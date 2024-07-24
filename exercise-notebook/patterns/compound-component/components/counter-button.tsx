import React from "react";
import { useCounterContext } from "../use-counter-context";

// 기본 속성 확장 방법
// 제너릭은 이벤트에 사용됨
interface CounterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  countType: "increment" | "decrement";
}

export default function CounterButton({
  countType,
  onClick,
  ...others
}: CounterButtonProps) {
  const counterContext = useCounterContext();

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    if (countType === "increment") {
      counterContext.onIncrement?.();
    } else {
      counterContext.onDecrement?.();
    }

    onClick?.(event);
  };

  return (
    <button {...others} onClick={handleButtonClick}>
      {countType === "increment" ? "+" : "-"}
    </button>
  );
}
