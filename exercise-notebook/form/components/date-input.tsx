import { InputProps, Input } from "@/ui/form/form-hook-controlled-form";
import React from "react";

interface DateInputPros extends Omit<InputProps, "type"> {
  max?: string;
  min?: string;
}
export function DateInput({ ...props }: DateInputPros) {
  return <Input type={"date"} {...props} />;
}
