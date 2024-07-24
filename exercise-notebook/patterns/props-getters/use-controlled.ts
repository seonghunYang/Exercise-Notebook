import { SetStateAction, useCallback, useRef, useState } from "react";

interface UseControlledArgs<T = any> {
  valueProps?: T;
  defaultValue: T;
}

type UseControlledReturn<T = any> = [T, React.Dispatch<SetStateAction<T>>];

export function useControlled<T = any>({
  valueProps,
  defaultValue,
}: UseControlledArgs<T>): UseControlledReturn<T> {
  const [state, setState] = useState<T>(defaultValue);

  const isControlled = valueProps !== undefined

  const value = isControlled ? valueProps : state;

  const setValue: React.Dispatch<SetStateAction<T>> = useCallback(
    (newValue) => {
      !isControlled && setState(newValue);
    },
    []
  );

  return [value, setValue];
}
