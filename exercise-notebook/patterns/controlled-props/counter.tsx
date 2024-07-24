import { useControlled } from "./use-controlled";

interface CounterProps {
  value?: number;
  defaultValue?: number;
  onChange?: (next: number) => void;
}

export default function Counter({
  value,
  defaultValue,
  onChange,
}: CounterProps) {
  const [count, setCount] = useControlled({
    valueProps: value,
    defaultValue,
  });

  const handleIncrementClick = () => {
    setCount((prev) => (prev ? prev + 1 : 1));
    onChange?.(count ? count + 1 : 1);
  };

  const handleDecrementClick = () => {
    setCount((prev) => (prev ? prev - 1 : 1));
    onChange?.(count ? count - 1 : 1);
  };

  return (
    <>
      <button onClick={handleIncrementClick}>+</button>
      <input type={"number"} value={count} />
      <button onClick={handleDecrementClick}>-</button>
    </>
  );
}
