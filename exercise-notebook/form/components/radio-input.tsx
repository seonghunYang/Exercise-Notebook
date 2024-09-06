interface RadioInputProps {
  value: string;
  errorMessage: string;
  wasSubmitted: boolean;
  label: string;
  name: string;
  inputs: string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RadioInput({
  value,
  name,
  label,
  wasSubmitted,
  errorMessage,
  inputs,
  onChange,
}: RadioInputProps) {
  return (
    <div>
      <span>{label}</span>
      {inputs.map((input, idx) => (
        <label
          key={input}
          id={`label-${name}-${idx}`}
          htmlFor={`input-${name}-${idx}`}
        >
          <input
            type={"radio"}
            name={name}
            checked={value === input}
            id={`input-${name}-${idx}`}
            value={input}
            onChange={onChange}
            aria-labelledby={`label-${name}=${idx}`}
            aria-describedby={`error-${name}`}
            aria-invalid={errorMessage ? true : false}
          />
          {input}
        </label>
      ))}
      {errorMessage && wasSubmitted && (
        <div id={`error-${name}`}>{errorMessage}</div>
      )}
    </div>
  );
}
