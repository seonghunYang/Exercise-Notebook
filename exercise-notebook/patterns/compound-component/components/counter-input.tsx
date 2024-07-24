import { useCounterContext } from "../use-counter-context";

interface CounterInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function CounterInput({
  onChange,
  ...others
}: CounterInputProps) {
  const counterContext = useCounterContext();

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    counterContext.onChange?.(parseInt(value));
    onChange?.(event);
  };

  return (
    <input
      type={"number"}
      {...others}
      value={counterContext.count}
      onChange={handleInputChange}
    />
  );
}
