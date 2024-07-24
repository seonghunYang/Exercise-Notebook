import { Reducer, useReducer } from "react";
import { CounterAction, CounterReducer } from "./counter-reducer";

type OuterReducer = (
  state: number,
  action: CounterAction,
  next: typeof CounterReducer
) => number;

interface CounterProps {
  defaultValue?: number;
  reducer: OuterReducer;
}

function composeReducer(
  outerReducer?: OuterReducer
): Reducer<number, CounterAction> {
  return function (prevState, action) {
    if (!outerReducer) {
      return CounterReducer(prevState, action);
    }
    return outerReducer(prevState, action, CounterReducer);
  };
}

export default function Counter({ defaultValue, reducer }: CounterProps) {
  const [count, dispatch] = useReducer(
    composeReducer(reducer),
    defaultValue ?? 0
  );

  return (
    <>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <input
        type={"number"}
        value={count}
        onChange={(event) =>
          dispatch({ type: "CHANGE", value: Number(event.target.value) })
        }
      />
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </>
  );
}
