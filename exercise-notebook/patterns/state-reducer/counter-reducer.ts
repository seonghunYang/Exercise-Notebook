import { Reducer } from "react";

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
