import "./App.css";
import { useFetch } from "./hooks/use-fetch";

async function fetcher(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("error network");
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
}

interface UsersResponse {
  data: UserResponse[];
}

interface UserResponse {
  id: number;
  email: string;
}

function App() {
  const { data } = useFetch<UsersResponse>(
    "https://reqres.in/api/users",
    fetcher
  );

  const users = data ? data.data : [];

  console.log(data);
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </>
  );
}

export default App;
