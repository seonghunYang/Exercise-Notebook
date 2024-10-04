import { useState } from "react";
import "./App.css";

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const handleShopItemAdd = (name, count) => {
    if (!validate(name)) return;

    setShoppingList([
      ...shoppingList,
      {
        id: crypto.randomUUID(),
        name,
        count,
      },
    ]);
  };

  const hadnleShopItemDelete = (id) => {
    setShoppingList(shoppingList.filter((s) => s.id !== id));
  };

  const handleShopItemChange = (shopping) => {
    setShoppingList(
      shoppingList.map((s) => {
        if (shopping.id === s.id) {
          return { ...shopping };
        }

        return s;
      })
    );
  };

  return (
    <>
      <ShopInput onSubmit={handleShopItemAdd} />
      {shoppingList.length > 0 ? (
        <div>
          {shoppingList.map((shopping) => (
            <ShopItem
              key={shopping.id}
              shopping={shopping}
              onDelete={hadnleShopItemDelete}
              onChange={handleShopItemChange}
            />
          ))}
        </div>
      ) : (
        <div>목록을 추가해주세여</div>
      )}
    </>
  );

  function validate(name) {
    return name.trim() !== "" && shoppingList.every((s) => s.name !== name);
  }
}

function ShopItem({ shopping, onDelete, onChange }) {
  const [edit, setEdit] = useState(false);

  const hadnleDeleteButtonClick = () => {
    onDelete?.(shopping.id);
  };

  const handleEditButtonClick = () => {
    setEdit(true);
  };

  const handleSaveButtonClick = () => {
    setEdit(false);
  };

  const handleShoppingChange = (e) => {
    onChange?.({
      ...shopping,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>이름</div>
      {edit ? (
        <input
          onChange={handleShoppingChange}
          name="name"
          value={shopping.name}
        />
      ) : (
        <div>{shopping.name}</div>
      )}

      <div>수량</div>
      {edit ? (
        <CountSelect
          onChange={handleShoppingChange}
          name="count"
          value={shopping.count}
        />
      ) : (
        <div>{shopping.count}</div>
      )}

      <button onClick={hadnleDeleteButtonClick}>삭제</button>
      {edit ? (
        <button onClick={handleSaveButtonClick}>저장</button>
      ) : (
        <button onClick={handleEditButtonClick}>수정</button>
      )}
    </div>
  );
}

function ShopInput({ onSubmit }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);

  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };

  const handleCountSelectChange = (e) => {
    setCount(Number(e.target.value));
  };

  const handleButtonClick = () => {
    onSubmit?.(name, count);
    setName("");
    setCount(1);
  };

  return (
    <div>
      <input value={name} onChange={handleNameInputChange} />
      <CountSelect value={count} onChange={handleCountSelectChange} />
      <button onClick={handleButtonClick}>추가</button>
    </div>
  );
}

function CountSelect({ value, onChange, ...props }) {
  return (
    <select {...props} value={value} onChange={onChange}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  );
}

export default App;
