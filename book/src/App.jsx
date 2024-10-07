import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [myBooks, setMyBooks] = useState([]);

  const { searchedBooks, isLoading, errorMessage } =
    useSearchedBooks(searchTerm);

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };

  const handleMyBookAdd = (book) => {
    if (myBooks.some((b) => b.id === book.id)) return false;

    setMyBooks([...myBooks, book]);
  };

  const handleMyBookDelete = (id) => {
    setMyBooks(myBooks.filter((book) => book.id !== id));
  };

  return (
    <>
      <SearchBar onSubmut={handleSearchTermChange} />
      <Loading isLoading={isLoading}>
        {searchedBooks &&
          searchedBooks.map((book) => (
            <SearchedBookItem
              key={book.id}
              book={book}
              onMyBookAdd={handleMyBookAdd}
            />
          ))}
        {errorMessage && <div>{errorMessage}</div>}
      </Loading>

      <div>
        <div>내 도서 목록</div>
        {myBooks.map((book) => (
          <MyBookItem onDelete={handleMyBookDelete} key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}

function Loading({ isLoading, children }) {
  return <>{isLoading ? <div>로딩 중 입니다</div> : children}</>;
}

function SearchedBookItem({ book, onMyBookAdd }) {
  const handleAddButtonClick = () => {
    onMyBookAdd?.({ ...book });
  };

  return (
    <div>
      <BookItem book={book} />
      <button onClick={handleAddButtonClick}>내 도서 추가</button>
    </div>
  );
}

function MyBookItem({ book, onDelete }) {
  const handleDeleteButtonClick = () => {
    onDelete?.(book.id);
  };

  return (
    <>
      <BookItem book={book} />
      <button onClick={handleDeleteButtonClick}>삭제</button>
    </>
  );
}

function BookItem({ book }) {
  return (
    <div>
      <div>제목: {book.title}</div>
      <div>출판사: {book.publisher}</div>
    </div>
  );
}

function useSearchedBooks(searchTerm) {
  const { data, isLoading, errorMessage } = useFetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`,
    (url) => fetch(url).then((response) => response.json())
  );

  const searchedBooks =
    data &&
    data.items &&
    data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      publisher: item.volumeInfo.publisher,
    }));

  return {
    searchedBooks,
    isLoading,
    errorMessage,
  };
}

function useFetch(url, fetcher) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        setLoading(true);
        setData();
        const data = await fetcher(url);

        if (!ignore) {
          setData(data);
          setErrorMessage("");
        }
      } catch (error) {
        setErrorMessage("데이터를 불러오는 도중 에러가 발생했습니다.");
      } finally {
        setLoading(false);
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
    errorMessage,
  };
}

function useFetch(url, fetcher) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffech(() => {
    let ignore = false;

    async function getData() {
      try {
        setIsLoading(true);
        const data = await fetcher(url);

        if (!ignore) {
          setData(data);
          setErrorMessage("");
        }
      } catch (e) {
        setErrorMessage(e.errorMessage);
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
    errorMessage,
  };
}

function SearchBar({ onSubmut }) {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchButtonClick = () => {
    onSubmut?.(value);
    setValue("");
  };

  return (
    <div>
      <input value={value} onChange={handleInputChange} />
      <button onClick={handleSearchButtonClick}>검색</button>
    </div>
  );
}

export default App;
