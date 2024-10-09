import { useState, useEffect, useRef, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const cache = new Map();

function useDebounce() {
  const timer = useRef(null);

  return useCallback((callback, delay) => {
    return (...args) => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, []);
}

function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useFetch(url, fetcher) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        setIsLoading(true);
        setError();
        const data = cache.get(url) || (await fetcher(url));

        if (!ignore) {
          setData(data);
          cache.set(url, data);
        }
      } catch (e) {
        setError("네트워크 에러가 발생했습니다");
      } finally {
        setIsLoading(false);
      }
    }
    getData();

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

function App() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const debouncedPage = useDebouncedValue(page, 1000);

  const {
    data: users,
    isLoading,
    error,
  } = useFetch(
    `https://jsonplaceholder.typicode.com/users?_page=${debouncedPage}&_limit=${itemsPerPage}`,
    (url) => fetch(url).then((response) => response.json())
  );

  const handlePageChange = (page) => {
    if (page < 1) return;
    setPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <>
      <ErrorBoundary error={!!error} errorMessage={error}>
        <ItemsPerPageSelect
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />
        <Loading isLoading={isLoading}>
          <UsersTable users={users} />
        </Loading>
        <PageNavigator currentPage={page} onChange={handlePageChange} />
      </ErrorBoundary>
    </>
  );
}

function ErrorBoundary({ error, errorMessage, children }) {
  return <>{error ? errorMessage : children}</>;
}

function Loading({ isLoading, children }) {
  return <>{isLoading ? <div>로딩 중 입니다</div> : children}</>;
}

function UsersTable({ users }) {
  return (
    <>{users && users.map((user) => <div key={user.id}>{user.name}</div>)}</>
  );
}

function PageNavigator({ currentPage, onChange }) {
  const handlePrevButtonClick = () => {
    onChange?.(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChange?.(currentPage + 1);
  };

  return (
    <>
      <button disabled={currentPage === 1} onClick={handlePrevButtonClick}>
        이전
      </button>
      <div>{currentPage}</div>
      <button onClick={handleNextButtonClick}>다음</button>
    </>
  );
}

function ItemsPerPageSelect({ value, onChange }) {
  const handleSelectChange = (e) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <select value={value} onChange={handleSelectChange}>
      <option value={1}>{1}</option>
      <option value={3}>{3}</option>
      <option value={5}>{5}</option>
    </select>
  );
}

export default App;
