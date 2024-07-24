import React, { Reducer, useReducer } from "react";
import { OuterReducer } from "./counter";
import {
  CountContext,
  CountDispatchContext,
  CounterAction,
  CounterReducer,
} from "./user-counter-reducer-context";

interface CounterProviderProps {
  reducer?: OuterReducer;
}

export function CounterProvider({
  reducer,
  children,
}: React.PropsWithChildren<CounterProviderProps>) {
  const [count, dispatch] = useReducer(composeReducer(reducer), 0);

  return (
    <CountContext.Provider value={count}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountContext.Provider>
  );
}

function composeReducer(
  outerReducer?: OuterReducer
): Reducer<number, CounterAction> {
  return function (state, action) {
    if (!outerReducer) {
      return CounterReducer(state, action);
    }
    return outerReducer(state, action, CounterReducer);
  };
}
