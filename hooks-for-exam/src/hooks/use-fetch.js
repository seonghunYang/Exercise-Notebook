import { useEffect, useState } from "react";

function useFetch(url, fetcher) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        setIsLoading(true);

        const data = await fetcher(url);

        if (!ignore) {
          setData(data);
          setError(undefined);
        }
      } catch (error) {
        if (!ignore) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getData();

    return () => {
      ignore = true;
    };
  }, [url, fetcher]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useFetch;
