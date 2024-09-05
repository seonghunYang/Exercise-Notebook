"use client";
import { useCheckboxGroupState } from "react-stately";
import { useCheckboxGroup, useCheckboxGroupItem } from "react-aria";
import React from "react";

let CheckboxGroupContext = React.createContext(null);

export function CheckboxGroup(props) {
  let { children, label, description } = props;
  let state = useCheckboxGroupState(props);
  let {
    groupProps,
    labelProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useCheckboxGroup(props, state);

  console.log("state", state);
  console.log("groupProps", labelProps);
  console.log("descriptionProps", descriptionProps);
  console.log("errorMessageProps", errorMessageProps);
  console.log("isInvalid", isInvalid);
  console.log("validationErrors", validationErrors);

  return (
    <div {...groupProps}>
      <span {...labelProps}>{label}</span>
      <CheckboxGroupContext.Provider value={state}>
        {children}
      </CheckboxGroupContext.Provider>
      {description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {description}
        </div>
      )}
      {isInvalid && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {validationErrors.join(" ")}
        </div>
      )}
    </div>
  );
}

export function Checkbox(props) {
  let { children } = props;
  let state = React.useContext(CheckboxGroupContext);
  let ref = React.useRef(null);
  let { inputProps } = useCheckboxGroupItem(props, state, ref);

  let isDisabled = state.isDisabled || props.isDisabled;
  let isSelected = state.isSelected(props.value);

  console.dir(inputProps);
  return (
    <label
      style={{
        display: "block",
        color: (isDisabled && "var(--gray)") || (isSelected && "var(--blue)"),
      }}
    >
      <input
        {...inputProps}
        onChange={(event) => {
          console.log("changeenvnet", event);
          inputProps.onChange?.(event);
        }}
        ref={ref}
      />
      {children}
    </label>
  );
}
