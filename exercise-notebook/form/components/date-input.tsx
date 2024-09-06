import React from "react";
import { Input, InputProps } from "./input";

interface DateInputPros extends Omit<InputProps, "type"> {
  max?: string;
  min?: string;
}
export function DateInput({ ...props }: DateInputPros) {
  return <Input type={"date"} {...props} />;
}
