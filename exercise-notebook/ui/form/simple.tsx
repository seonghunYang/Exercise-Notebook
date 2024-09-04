"use client";
import React, { useEffect, useRef, useState } from "react";

function validateId(id: string) {
  if (id === "") {
    return "아이디를 입력해주세요.";
  }
  if (!id.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
    return "이메일 형식이 아닙니다.";
  }
  return null;
}

function validatePassword(password: string) {
  if (password === "") {
    return "비밀번호를 입력해주세요.";
  }
  if (password.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다.";
  }

  if (!password.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/)) {
    return "특수문자가 포함되어야 합니다.";
  }

  return null;
}

export default function SimpleForm() {
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({
    id: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });

    if (event.currentTarget.name === "id") {
      setErrorMessage({
        ...errorMessage,
        id: validateId(event.currentTarget.value) ?? "",
      });
    }
    if (event.currentTarget.name === "password") {
      setErrorMessage({
        ...errorMessage,
        password: validatePassword(event.currentTarget.value) ?? "",
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // // console.log(
    // console.log(event);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        type="email"
        isRequired={true}
        name="id"
        label="아이디"
        errorMessage={errorMessage.id}
        onChange={handleChange}
        value={loginForm.id}
      />
      <Input
        type="password"
        name="password"
        label="비밀번호"
        errorMessage={errorMessage.password}
        onChange={handleChange}
        value={loginForm.password}
      />
      <input type="submit" />
    </form>
  );
}

interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
  value: string;
  isRequired?: boolean;
  errorMessage: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  type = "text",
  label,
  name,
  value,
  isRequired,
  errorMessage,
  onChange,
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [touced, setTouched] = useState(false);
  const [prevErrorMessage, setPrevErrorMessage] =
    useState<string>(errorMessage);

  // if (prevErrorMessage !== errorMessage) {
  //   setPrevErrorMessage(errorMessage);
  // }

  // const errorMessage = getNativeErrorMessage(ref);
  const displayErrorMessage = touced ? errorMessage : prevErrorMessage;

  const handleBlur = () => {
    setTouched(true);
    setPrevErrorMessage(errorMessage);
  };

  const handleFocus = () => {
    setTouched(false);
  };

  return (
    <div>
      <div>
        <label id={`label-${name}`} htmlFor={`input-${name}`}>
          {label}
        </label>
      </div>
      <input
        type={type}
        ref={ref}
        required={isRequired}
        value={value}
        name={name}
        id={`input-${name}`}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        aria-labelledby={`label-${name}`}
        aria-describedby={`error-${name}`}
        aria-invalid={errorMessage.length > 0}
      />
      <div id={`error-${name}`}>
        {displayErrorMessage && <div>{displayErrorMessage}</div>}
        {/* {displayErrorMessage &&
          displayErrorMessage.map((message) => (
            <div key={message}>{message}</div>
          ))} */}
      </div>
    </div>
  );
}

function getNativeErrorMessage(
  ref: React.RefObject<HTMLInputElement>
): string[] {
  if (!ref.current || ref.current.validationMessage === "") return [];

  // message 커스터마이징
  // if (ref.current.validity.valueMissing) {
  //   ref.current.setCustomValidity("필수 입력 항목입니다.");
  // }

  return [ref.current.validationMessage];
}
