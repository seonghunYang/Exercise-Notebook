import { useCounterReducerContext } from "../user-counter-reducer-context";

interface CounterInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function CounterInput({ onChange, ...others }: CounterInputProps) {
  const [count, dispatch] = useCounterReducerContext();

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    dispatch({ type: "CHANGE", value: Number(value) });
    onChange?.(event);
  };

  return (
    <input
      type={"number"}
      {...others}
      value={count}
      onChange={handleInputChange}
    />
  );
}
