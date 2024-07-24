import { createContext, useContext } from "react";

interface CounterContextValue {
  count: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onChange?: (count: number) => void;
}

export const CounterContext = createContext<CounterContextValue | undefined>({
  count: 0,
});

export function useCounterContext() {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("Counter 컴포넌트 내부에서만 사용 가능합니다");
  }

  return context;
}
