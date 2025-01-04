import { useState, useRef, useEffect } from "react";

async function fetchData(page) {
  const newData = Array.from(
    { length: 10 },
    (_, i) => `Item ${i + 1 + (page - 1) * 10}`
  );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newData);
    }, 1000);
  });
}

function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const data = await fetchData(page);

        setData((prev) => [...prev, ...data]);
      } catch {
        throw new Error("network error");
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.unobserve(observerRef.current);
    };
  }, [isLoading]);

  return (
    <div>
      {data.map((d) => (
        <li>{d}</li>
      ))}
      {isLoading ? <p>로딩중 입니다</p> : null}
      <div ref={observerRef}></div>
    </div>
  );
}

export default InfiniteScroll;
