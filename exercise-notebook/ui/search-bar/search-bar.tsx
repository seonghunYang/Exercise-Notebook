"use client";
import { stock_list } from "@/app/api/stocks/data";
import React, { useEffect, useState } from "react";

type Stock = (typeof stock_list)[number];

async function fetchStockList(query: string): Promise<Stock[]> {
  if (query === "") {
    return [];
  }

  const querystring = new URLSearchParams({
    query,
  }).toString();
  const response = await fetch(`api/stocks?${querystring}`);
  const { data } = await response.json();
  return data;
}

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [searchedList, setSearchedList] = useState<Stock[]>([]);

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      const stockList = await fetchStockList(searchText);

      setSearchedList(stockList);
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [searchText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  return (
    <SearchInput value={searchText} onChange={handleChange}>
      <div>검색 결과</div>
      {searchedList.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </SearchInput>
  );
}

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
