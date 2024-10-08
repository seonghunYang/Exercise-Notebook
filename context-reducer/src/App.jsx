import { useState, createContext, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useContext } from "react";
// App.js

// 사용자 추가:
// 새로운 사용자를 추가할 수 있어야 하며, 사용자 정보는 이름, 나이, 직업으로 구성됩니다.
// 사용자가 추가되면 사용자 목록에 나타나야 합니다.

// 사용자 삭제:
// 각 사용자 옆에는 삭제 버튼이 있어, 해당 사용자를 목록에서 삭제할 수 있어야 합니다.

// 사용자 상태 업데이트:
// 각 사용자 정보에는 "활성화/비활성화" 버튼이 있어, 사용자의 상태(active/inactive)를 토글할 수 있어야 합니다.
// 사용자가 활성 상태일 경우 목록에서 "활성 사용자"로 표시되고, 비활성 상태일 경우 "비활성 사용자"로 표시됩니다.

// 상태 저장 및 전역 관리:
// 사용자 상태는 Context API와 useReducer를 사용하여 전역적으로 관리해야 하며, 어떤 컴포넌트에서든 사용자 목록을 추가, 삭제, 업데이트할 수 있어야 합니다.

// 유효성 검사:
// 사용자 추가 시, 이름이 빈 문자열이거나 중복되는 경우 추가되지 않아야 하며, 경고 메시지를 표시하세요.

const UsersContext = createContext(null);
const UsersDispatchContext = createContext(null);

function UsersReducer(users, action) {
  const { type, payload } = action;

  switch (type) {
    case "add": {
      return [
        ...users,
        {
          ...payload,
          id: crypto.randomUUID(),
          active: false,
        },
      ];
    }
    case "active": {
      return users.map((user) => {
        if (user.id === payload.id) {
          return {
            ...user,
            active: payload.active,
          };
        }

        return user;
      });
    }
    case "delete": {
      return users.filter((user) => user.id !== payload.id);
    }
    default: {
      throw Error("잘못된거임");
    }
  }
}

function UsersProvider({ children }) {
  const [users, dispatch] = useReducer(UsersReducer, []);

  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
}

function App() {
  return (
    <UsersProvider>
      <div>
        <h1>사용자 관리 애플리케이션</h1>
        <UserForm />
        <UserList />
      </div>
    </UsersProvider>
  );
}

const initialFormState = {
  name: "",
  age: 0,
};

function UserForm() {
  const dispatch = useContext(UsersDispatchContext);

  const [userForm, setUserForm] = useState(initialFormState);

  const handleInputChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserAdd = () => {
    if (userForm.name.trim() === "" || userForm.age < 0) return;

    dispatch({
      type: "add",
      payload: {
        ...userForm,
      },
    });

    setUserForm({
      ...initialFormState,
    });
  };

  return (
    <div>
      <label htmlFor="name">이름</label>
      <input
        onChange={handleInputChange}
        value={userForm.name}
        name="name"
        id="name"
      />
      <label htmlFor="age">나이</label>
      <input
        onChange={handleInputChange}
        value={userForm.age}
        type={"number"}
        name="age"
        id="age"
      />
      <button onClick={handleUserAdd}>생성</button>
    </div>
  );
}

function UserList() {
  const users = useContext(UsersContext);
  const dispatch = useContext(UsersDispatchContext);

  const handleUserDelete = (id) => {
    dispatch({
      type: "delete",
      payload: {
        id,
      },
    });
  };

  const handleUserUpdate = (id, active) => {
    dispatch({
      type: "active",
      payload: {
        id,
        active,
      },
    });
  };

  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onDelete={handleUserDelete}
            onActiveChange={handleUserUpdate}
          />
        ))
      ) : (
        <div>유저를 입력하세여</div>
      )}
    </div>
  );
}

function UserItem({ user, onDelete, onActiveChange }) {
  const handleButtonClick = () => {
    onDelete?.(user.id);
  };

  const handleCheckboxChange = (e) => {
    onActiveChange?.(user.id, e.target.checked);
  };

  return (
    <div>
      <input
        onChange={handleCheckboxChange}
        type="checkbox"
        checked={user.active}
      />
      <div>이름 {user.name}</div>
      <div>나이 {user.age}</div>
      <button onClick={handleButtonClick}>삭제</button>
    </div>
  );
}

export default App;
