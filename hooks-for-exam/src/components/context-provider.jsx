import { createContext, useContext, useState } from "react";

const ValueContext = createContext(undefined);

export default function ValueProvider({ children }) {
  const [value, setValue] = useState();

  return (
    <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
  );
}

export function useValueContext() {
  const context = useContext(ValueContext);

  if (!context) {
    throw new Error("ValueProvider 아래에서만 사용 가능합니다");
  }

  return context;
}
