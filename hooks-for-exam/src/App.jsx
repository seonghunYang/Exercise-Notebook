import { useState, useMemo } from "react";
import "./App.css";
import useFetch from "./hooks/use-fetch";
import { useDebouncedValue } from "./hooks/use-debounced-value";
import InfiniteScroll from "./components/infinite-scroll";

const URL = "https://reqres.in/api/users";

async function fetcher(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("fetch error");
    }

    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function App() {
  const [value, setValue] = useState("");
  const { debouncedValue } = useDebouncedValue(value, 1000);
  const { data, isLoading, error } = useFetch(URL, fetcher);

  const users = data ? data.data : [];

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const filteredUsers = useMemo(
    () => users.filter((user) => user.email.includes(debouncedValue)),
    [users, debouncedValue]
  );

  return (
    <div>
      {isLoading ? <div>loading</div> : null}
      <input value={value} onChange={handleInputChange} />
      {filteredUsers.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
      <InfiniteScroll />
    </div>
  );
}

export default App;
