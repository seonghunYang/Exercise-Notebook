"use client";
import React, { useState } from "react";

interface LoginFormData {
  id: string;
  password: string;
}

type LoginFormError = {
  [name in keyof LoginFormData]: string;
};

export default function ControlledForm() {
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    id: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<LoginFormError>({
    id: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = validateLoginForm(loginForm);

    const valid = Object.values(validationResult).every((v) => v === "");

    if (!valid) {
      setErrorMessage(validationResult);
      return;
    }

    alert(JSON.stringify(loginForm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          name="id"
          id="id"
          value={loginForm.id}
          onChange={handleChange}
        />
      </div>
      {errorMessage["id"] && <div>{errorMessage["id"]}</div>}
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          value={loginForm.password}
          onChange={handleChange}
        />
      </div>
      {errorMessage["password"] && <div>{errorMessage["password"]}</div>}
      <button type="submit">로그인</button>
    </form>
  );
}

function validateLoginForm(loginForm: LoginFormData): LoginFormError {
  return {
    id: validateId(loginForm.id),
    password: validatePassword(loginForm.password),
  };
}

function validateId(value: string): string {
  if (value === "") {
    return "id를 입력하세요";
  }
  if (!value.match(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]/)) {
    return "이메일이 아닙니다";
  }

  return "";
}

function validatePassword(value: string): string {
  if (value.length < 8) {
    return "비밀번호는 8자리 이상이어야 합니다";
  }
  return "";
}
