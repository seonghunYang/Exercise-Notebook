import React, { useState } from "react";
import { Input, InputProps } from "./input";

export interface SearchInputProps<T> extends Omit<InputProps, "type"> {
  searchListData: T[];
  searchRender: (data: T) => React.ReactNode;
  searchFilter: (data: T) => boolean;
}

export function SearchInput<T>({
  searchListData,
  searchRender,
  searchFilter,
  ...props
}: SearchInputProps<T>) {
  const [open, setOpen] = useState(false);

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onFocus?.(event);
    setOpen(true);
  };

  const handleUnderlayClick = () => {
    setOpen(false);
  };

  const searchedList = searchListData.filter(searchFilter);

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
      <Input type={"search"} {...props} onFocus={handleInputFocus} />
      {open && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
          }}
        >
          {
            <div>
              {searchedList.map((data) => {
                return searchRender(data);
              })}
            </div>
          }
        </div>
      )}
    </div>
  );
}
