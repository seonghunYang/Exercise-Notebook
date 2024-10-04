import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const handleTodoCreate = (text) => {
    if (!text.trim()) return;

    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        checked: false,
      },
    ]);
  };

  const handleItemCheckedToggle = (checked, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked,
          };
        }

        return todo;
      })
    );
  };

  const handleItemDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleFilterOptionChange = (value) => {
    setFilterOption(value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterOption === "all") return true;
    if (filterOption === "done") return todo.checked;
    if (filterOption === "doing") return !todo.checked;
  });

  return (
    <>
      <TodoInput onSubmit={handleTodoCreate} />

      <Select
        value={filterOption}
        onChange={handleFilterOptionChange}
        items={[
          {
            text: "모두 보기",
            value: "all",
          },
          {
            text: "완료된 항목 보기",
            value: "done",
          },
          {
            text: "미완료된 항목 보기",
            value: "doing",
          },
        ]}
      />

      <div id="todos">
        {filteredTodos.map((todo) => (
          <Item
            key={todo.id}
            todo={todo}
            onChecked={handleItemCheckedToggle}
            onDelete={handleItemDelete}
          />
        ))}
      </div>
    </>
  );
}

function Select({ value, items, onChange }) {
  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <select onChange={handleChange} value={value}>
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
}

function TodoInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const smbitText = (text) => {
    onSubmit?.(text);
    setText("");
  };

  const handleButtonClick = () => {
    smbitText(text);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      smbitText(text);
    }
  };

  return (
    <div>
      <input
        onKeyDown={handleInputKeyDown}
        value={text}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>추가</button>
    </div>
  );
}

function Item({ todo, onChecked, onDelete }) {
  const handleCheckBoxChange = (e) => {
    onChecked?.(e.target.checked, todo.id);
  };

  const handleButtonClick = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete?.(todo.id);
    }
  };

  return (
    <div key={todo.id}>
      <input
        checked={todo.checked}
        onChange={handleCheckBoxChange}
        type="checkbox"
      />
      <div style={{ color: todo.checked && "red" }}>{todo.text}</div>
      <button onClick={handleButtonClick}>삭제</button>
    </div>
  );
}

export default App;
