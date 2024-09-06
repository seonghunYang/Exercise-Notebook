import { useState } from "react";

export interface InputProps {
  value: string | number;
  errorMessage: string;
  wasSubmitted: boolean;
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function Input({
  value,
  errorMessage,
  wasSubmitted,
  label,
  name,
  type,
  checked,
  onBlur,
  onChange,
  ...props
}: InputProps) {
  const [touched, setTouched] = useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(event);
  };

  return (
    <div>
      <label id={`label-${name}`} htmlFor={`input-${name}`}>
        {label}
      </label>
      <input
        {...props}
        type={type}
        name={name}
        checked={checked}
        id={`input-${name}`}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        aria-labelledby={`label-${name}`}
        aria-describedby={`error-${name}`}
        aria-invalid={errorMessage ? true : false}
      />
      {errorMessage && (touched || wasSubmitted) && (
        <div id={`error-${name}`}>{errorMessage}</div>
      )}
    </div>
  );
}
