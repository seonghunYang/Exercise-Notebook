function Input({ label, name, errorMessage, ...props }) {
  return (
    <div>
      <label id={`label-${name}`} htmlFor={`input-${name}`}>
        {label}
      </label>
      <input
        {...props}
        id={`input-${name}`}
        name={name}
        aria-labelledby={`label-${name}`}
        aria-describedby={`error-${name}`}
        aria-invalid={errorMessage ? true : false}
      />
      {errorMessage && <div id={`error-${name}`}>{errorMessage}</div>}
    </div>
  );
}
