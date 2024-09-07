"use client";
import React, { useState } from "react";
import { stock_list } from "@/app/api/stocks/data";
import { useFetch } from "./use-fetch";

type Stock = (typeof stock_list)[number];

async function fetchStockList(url: string) {
  const response = await fetch(url);
  const { data } = await response.json();

  return data;
}

export default function SearchBarEffect() {
  const [query, setQuery] = useState("");
  const { data: searchedStockList } = useFetch<Stock[]>({
    url: `/api/stocks?query=${query}`,
    fetcher: fetchStockList,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <SearchInput value={query} onChange={handleChange}>
      <div>검색 결과</div>
      {searchedStockList?.map((stock) => (
        <div key={stock.name}>{stock.name}</div>
      ))}{" "}
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
