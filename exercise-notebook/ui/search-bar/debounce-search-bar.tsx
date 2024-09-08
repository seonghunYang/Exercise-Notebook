"use client";
import React, { useEffect, useState } from "react";
import { stock_list } from "@/app/api/stocks/data";
import { useFetch } from "./use-fetch";
import { SearchInput } from "./search-input";

type Stock = (typeof stock_list)[number];

async function fetchStockList(url: string) {
  const response = await fetch(url);
  const { data }: { data: Stock[] } = await response.json();

  // if (Math.random() < 0.4) throw Error("서버 에러가 발생했습니다.");

  return data;
}

export default function DebouncedSearchbar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouceValue(query);
  const {
    data: searchedStockList,
    isLoading,
    error,
  } = useFetch<Stock[], Error>({
    url: `/api/stocks?query=${debouncedQuery}`,
    fetcher: fetchStockList,
    keepPreviousData: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <SearchInput value={query} onChange={handleChange}>
      {
        <div
          style={{
            opacity: isLoading ? 0.4 : 1,
          }}
        >
          <div>검색 결과</div>

          {!error ? (
            searchedStockList?.map((stock) => (
              <div key={stock.name}>{stock.name}</div>
            ))
          ) : (
            <div>{error.message}</div>
          )}
        </div>
      }
    </SearchInput>
  );
}

function useDebouceValue(value: unknown, delay = 200) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 기존 타이머 제거
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
