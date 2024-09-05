"use client";
import React, { ReactText, useState } from "react";
import { useForm } from "./use-form";

interface LoginFormData {
  id: string;
  password: string;
}

type LoginFormError = {
  [name in keyof LoginFormData]: string;
};

export default function FormHookControlledForm() {
  const {
    formState: loginForm,
    errorMessage,
    handleChange,
    vaidateForm,
  } = useForm<LoginFormData>({
    initialState: {
      id: "",
      password: "",
    },
    validateFn: validateLoginForm,
  });

  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    vaidateForm();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setWasSubmitted(true);

    const valid = vaidateForm();

    if (!valid) {
      return;
    }

    alert(JSON.stringify(loginForm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="아이디"
        name="id"
        value={loginForm.id}
        errorMessage={errorMessage["id"]}
        wasSubmitted={wasSubmitted}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        value={loginForm.password}
        errorMessage={errorMessage["password"]}
        wasSubmitted={wasSubmitted}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button type="submit">로그인</button>
    </form>
  );
}

interface InputProps {
  value: string;
  errorMessage: string;
  wasSubmitted: boolean;
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({
  value,
  errorMessage,
  wasSubmitted,
  label,
  name,
  type,
  onBlur,
  onChange,
}: InputProps) {
  const [touched, setTouched] = useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(event);
  };

  return (
    <div>
      <label id={`label-${name}`} htmlFor={`input-${name}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={`input-${name}`}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        aria-labelledby={`label-${name}`}
        aria-describedby={`error-${name}`}
        aria-invalid={errorMessage ? true : false}
      />
      {errorMessage && (touched || wasSubmitted) && (
        <div id={`error-${name}`}>{errorMessage}</div>
      )}
    </div>
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
