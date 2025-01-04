import "./App.css";
import useFetch from "./hooks/use-fetch";

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
  const { data, isLoading, error } = useFetch(URL, fetcher);

  console.log(data, isLoading, error);

  const users = data.data;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}

export default App;
