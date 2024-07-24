import { useControlled } from "./use-controlled";
import { useCounter } from "./use-counter";

interface CounterProps {
  value?: number;
  defaultValue?: number;
  onChange?: (next: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export default function Counter({
  value,
  defaultValue,
  onChange,
  onIncrement,
  onDecrement,
}: CounterProps) {
  const counter = useCounter({
    value,
    defaultValue,
    onChange,
    onIncrement,
    onDecrement,
  });

  return (
    <>
      <button onClick={counter.onIncrement}>+</button>
      <input type={"number"} value={counter.count} />
      <button onClick={counter.onDecrement}>-</button>
    </>
  );
}
