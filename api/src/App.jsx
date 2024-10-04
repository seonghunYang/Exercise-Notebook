import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const {
    data: users,
    isLoading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users", (url) =>
    fetch(url).then((response) => response.json())
  );

  return (
    <>
      {error && <div>{error}</div>}
      {isLoading && <div>loading...</div>}
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <div>{user.name}</div>
          </div>
        ))}
    </>
  );
}

function useFetch(url, fetcher) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        setIsLoading(true);
        const data = await fetcher(url);

        if (!ignore) {
          setData(data);
        }
      } catch (e) {
        setError(`Error: ${e.message}`);
        throw e;
      } finally {
        setIsLoading(false);
      }
    }

    getData().catch(() => getData());

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, isLoading, error };
}

export default App;
