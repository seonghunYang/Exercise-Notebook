import { createContext, useContext } from "react";

interface CounterContextValue {
  count: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onChange?: (count: number) => void;
}

export const CounterContext = createContext<CounterContextValue | undefined>(
  undefined
);

export function useCounterContext() {
  const context = useContext(CounterContext);

  if (context === undefined) {
    throw new Error("Counter 컴포넌트 내부에서만 사용 가능합니다");
  }

  return context;
}
