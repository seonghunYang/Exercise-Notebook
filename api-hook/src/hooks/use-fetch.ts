import { useEffect, useState } from "react";

export const useFetch = <T>(
  url: string,
  fetcher: (url: string) => Promise<T>
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        setIsLoading(true);
        setError(undefined);
        const data = await fetcher(url);

        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    data,
  };
};
