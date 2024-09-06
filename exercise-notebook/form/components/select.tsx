interface SelectProps {
  value: string;
  errorMessage: string;
  wasSubmitted: boolean;
  label: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

export function Select({
  name,
  label,
  value,
  errorMessage,
  wasSubmitted,
  onChange,
  children,
  ...props
}: React.PropsWithChildren<SelectProps>) {
  return (
    <div>
      <label id={`label-${name}`} htmlFor={`input-${name}`}>
        {label}
      </label>
      <select
        {...props}
        value={value}
        name={name}
        id={`input-${name}`}
        onChange={onChange}
        aria-labelledby={`label-${name}`}
        aria-describedby={`error-${name}`}
        aria-invalid={errorMessage ? true : false}
      >
        {children}
      </select>
      {errorMessage && wasSubmitted && (
        <div id={`error-${name}`}>{errorMessage}</div>
      )}
    </div>
  );
}
