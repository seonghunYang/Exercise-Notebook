"use client";
import { useNumberFieldState } from "react-stately";
import { useLocale, useNumberField } from "react-aria";
import React from "react";

// Reuse the Button from your component library. See below for details.
export function NumberField(props) {
  let { locale } = useLocale();
  console.log(locale);
  let state = useNumberFieldState({ ...props, locale });
  let inputRef = React.useRef(null);
  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  console.log("state", state);
  console.log("labelProps", labelProps);
  console.log("inputProps", inputProps);
  console.log("groupProps", groupProps);
  console.log("incrementButtonProps", incrementButtonProps);

  return (
    <div>
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps}>
        <button {...decrementButtonProps}>-</button>
        <input {...inputProps} ref={inputRef} />
        <button {...incrementButtonProps}>+</button>
      </div>
    </div>
  );
}
