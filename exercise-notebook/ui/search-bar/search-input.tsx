import { useState } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({
  children,
  ...props
}: React.PropsWithChildren<SearchInputProps>) {
  const [open, setOpen] = useState(false);

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setOpen(true);
  };

  const handleUnderlayClick = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {open && (
        <div
          style={{
            position: "fixed",
            inset: "0px",
          }}
          aria-hidden={true}
          onClick={handleUnderlayClick}
        ></div>
      )}
      <input type={"search"} {...props} onFocus={handleInputFocus} />
      {open && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
