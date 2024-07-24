import React, { createContext, Reducer, useContext } from "react";

type CounterActionType = "INCREMENT" | "DECREMENT" | "CHANGE";

export interface CounterAction {
  type: CounterActionType;
  value?: number;
}

export const CounterReducer: Reducer<number, CounterAction> = function (
  state = 0,
  action
) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "CHANGE":
      return action.value ?? 0;
    default:
      return state;
  }
};

export const CountContext = createContext<number>(0);
export const CountDispatchContext = createContext<
  React.Dispatch<CounterAction> | undefined
>(undefined);

type useCounterReducerContextReturn = [number, React.Dispatch<CounterAction>];

export function useCounterReducerContext(): useCounterReducerContextReturn {
  const count = useContext(CountContext);
  const dispatch = useContext(CountDispatchContext);

  if (!dispatch) {
    throw new Error("Counter 내부에서만 사용 가능합니다");
  }

  return [count, dispatch];
}
