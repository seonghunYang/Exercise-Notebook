import { useState } from "react";

import "./App.css";

function App() {
  const [memoList, setMemoList] = useState([]);

  const handleMemoAdd = (text) => {
    if (text.trim() === "") return;

    setMemoList([
      ...memoList,
      {
        text,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const handleMemoDelete = (id) => {
    setMemoList(memoList.filter((memo) => memo.id !== id));
  };

  const handleMemoEdit = (id, value) => {
    setMemoList(
      memoList.map((memo) => {
        if (memo.id === id) {
          memo = {
            ...memo,
            text: value,
          };
        }

        return memo;
      })
    );
  };

  return (
    <>
      <MemoInput onSubmit={handleMemoAdd} />
      <div>
        {memoList.map((memo) => (
          <MemoItem
            key={memo.id}
            memo={memo}
            onDelete={handleMemoDelete}
            onChange={handleMemoEdit}
          />
        ))}
      </div>
    </>
  );
}

function MemoInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    onSubmit?.(text);
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>추가</button>
    </div>
  );
}

function MemoItem({ memo, onDelete, onChange }) {
  const [edit, setEdit] = useState(false);

  const handleButtonClick = () => {
    onDelete?.(memo.id);
  };

  const handleTextClick = () => {
    setEdit(true);
  };

  const handleEditInputChange = (e) => {
    onChange?.(memo.id, e.target.value);
  };

  const handleEditInputKeydown = (e) => {
    if (e.key === "Enter") {
      setEdit(false);
    }
  };

  return (
    <div>
      {edit ? (
        <input
          onKeyDown={handleEditInputKeydown}
          value={memo.text}
          onChange={handleEditInputChange}
        />
      ) : (
        <div onClick={handleTextClick}>{memo.text}</div>
      )}

      <button onClick={handleButtonClick}>삭제</button>
    </div>
  );
}

export default App;
