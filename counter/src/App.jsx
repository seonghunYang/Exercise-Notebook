import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const MAX_COUNT = 10;
const MIN_COUNT = 0;

function getMessage(count) {
  if (count === MAX_COUNT) {
    return "최대 값에 도달했습니디";
  }
  if (count === MIN_COUNT) {
    return "최소 값에 도달했습니다";
  }

  return "";
}

function App() {
  const [count, setCount] = useState(0);

  const message = getMessage(count);

  const handleCountIncrease = () => {
    setCount((prev) => {
      if (prev === MAX_COUNT) return prev;

      return prev + 1;
    });
  };

  const handleCountDecrease = () => {
    setCount((prev) => {
      if (prev === MIN_COUNT) return prev;

      return prev - 1;
    });
  };

  const handleCountReset = () => {
    setCount(0);
  };

  return (
    <>
      <button onClick={handleCountReset}>리셋</button>
      <Counter
        count={count}
        onIncrease={handleCountIncrease}
        onDecrease={handleCountDecrease}
      />
      <div>{message}</div>
    </>
  );
}

function Counter({ count, onIncrease, onDecrease }) {
  const handleIncrementButtonClick = () => {
    onIncrease?.();
  };

  const handleDecrementButtonClick = () => {
    onDecrease?.();
  };

  return (
    <div>
      <button onClick={handleIncrementButtonClick}>증가</button>
      <div>{count}</div>
      <button onClick={handleDecrementButtonClick}>감소</button>
    </div>
  );
}

export default App;
