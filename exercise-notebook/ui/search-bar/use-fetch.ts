import { useState, useEffect } from "react";

interface UseFetchArgs<T> {
  url: string;
  fetcher: (url: string) => Promise<T>;
}
export function useFetch<T>({ url, fetcher }: UseFetchArgs<T>) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      const data = await fetcher(url);

      if (!ignore) {
        setData(data);
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [url]);

  return {
    data,
  };
}
