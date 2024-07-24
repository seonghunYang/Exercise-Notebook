import { useControlled } from "./use-controlled";

interface UseCounterArgs {
  value?: number;
  defaultValue?: number;
  onChange?: (next: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function useCounter({
  value,
  defaultValue,
  ...callbackProps
}: UseCounterArgs) {
  const [count, setCount] = useControlled({
    valueProps: value,
    defaultValue,
  });

  const onIncrement = () => {
    setCount((prev) => (prev ? prev + 1 : 1));
    callbackProps.onIncrement?.();
  };

  const onDecrement = () => {
    setCount((prev) => (prev ? prev - 1 : 1));
    callbackProps.onDecrement?.();
  };

  const onChange = (next: number) => {
    setCount(next);
    callbackProps.onChange?.(next);
  };

  return {
    count,
    setCount,
    onIncrement,
    onDecrement,
    onChange,
  };
}
