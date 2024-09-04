"use client";
import React, { useEffect, useRef, useState } from "react";

interface LoginForm {
  id: string;
  password: string;
}

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

function validate(loginForm: LoginForm) {
  return {
    id: validateId(loginForm.id) ?? "",
    password: validatePassword(loginForm.password) ?? "",
  };
}

export default function SimpleForm() {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    id: "",
    password: "",
  });

  const [wasSubmit, setWasSubmit] = useState(false);

  // const errorMessage = {
  //   id: validateId(loginForm.id) ?? "",
  //   password: validatePassword(loginForm.password) ?? "",
  // };

  const [errorMessage, setErrorMessage] = useState({
    id: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleInputBlur = () => {
    const errorMessage = validate(loginForm);
    setErrorMessage(errorMessage);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWasSubmit(true);

    const errorMessage = validate(loginForm);
    const invalid = Object.values(errorMessage).some(
      (message) => message !== ""
    );

    if (invalid) {
      setErrorMessage(errorMessage);
    }
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
        wasSubmit={wasSubmit}
        onBlur={handleInputBlur}
      />
      <Input
        type="password"
        name="password"
        label="비밀번호"
        errorMessage={errorMessage.password}
        onChange={handleChange}
        value={loginForm.password}
        wasSubmit={wasSubmit}
        onBlur={handleInputBlur}
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
  wasSubmit: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({
  type = "text",
  label,
  name,
  value,
  isRequired,
  errorMessage,
  wasSubmit,
  onChange,
  onBlur,
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [touced, setTouched] = useState(false);
  const [prevErrorMessage, setPrevErrorMessage] = useState<string>("");

  // const errorMessage = getNativeErrorMessage(ref);
  // const displayErrorMessage = touced ? errorMessage : prevErrorMessage;
  const displayErrorMessage = (touced || wasSubmit) && errorMessage;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    setPrevErrorMessage(errorMessage);
    onBlur(event);
  };

  // const handleFocus = () => {
  //   setTouched(false);
  // };

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
        aria-labelledby={`label-${name}`}
        aria-describedby={`error-${name}`}
        aria-invalid={errorMessage.length > 0}
      />
      <div id={`error-${name}`}>
        {displayErrorMessage && <div>{displayErrorMessage}</div>}
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
