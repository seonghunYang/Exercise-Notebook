import { useState, useEffect } from "react";

interface UseFetchArgs<T> {
  url: string;
  fetcher: (url: string) => Promise<T>;
  keepPreviousData?: boolean;
}
export function useFetch<T, E = any>({
  url,
  fetcher,
  keepPreviousData = false,
}: UseFetchArgs<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<E>();

  useEffect(() => {
    let ignore = false;

    if (!keepPreviousData) {
      // 이전 데이터 초기화
      setData(undefined);
    }

    async function startFetching() {
      setIsLoading(true);

      try {
        const data = await fetcher(url);

        if (!ignore) {
          // 데이터 생기면 에러 초기화
          setError((prev) => {
            if (prev) return;
            return prev;
          });

          setData(data);
        }
      } catch (error: any) {
        if (!ignore) {
          setError(error);
          // throw error; 상위에서 에러를 처리해야 할 경우(error boundary나)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
}
