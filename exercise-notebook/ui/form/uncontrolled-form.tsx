"use client";
import React, { ReactText, useState } from "react";
import { Checkbox, CheckboxGroup } from "./input/checkbox";

interface LoginFormData {
  id: string;
  password: string;
}

type LoginFormError = {
  [name in keyof LoginFormData]: string;
};

interface FormElements extends HTMLFormControlsCollection {
  id: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function UncontrolledForm() {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<LoginFormError>({
    id: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<LoginFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const loginForm = Object.fromEntries(formData);
    console.log("loginForm", loginForm);
    // event.currentTarget.elements.id.value
    setWasSubmitted(true);
    // const validationResult = validateLoginForm(loginForm);

    // const valid = Object.values(validationResult).every((v) => v === "");

    // if (!valid) {
    //   setErrorMessage(validationResult);
    //   return;
    // }

    alert(JSON.stringify(loginForm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="아이디"
        name="id"
        errorMessage={errorMessage["id"]}
        wasSubmitted={wasSubmitted}
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        errorMessage={errorMessage["password"]}
        wasSubmitted={wasSubmitted}
      />
      <CheckboxGroup name="sport" label="Favorite sports">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>
      <button type="submit">로그인</button>
    </form>
  );
}

interface InputProps {
  defaultValue?: string;
  errorMessage: string;
  wasSubmitted: boolean;
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({
  defaultValue = "",
  errorMessage,
  wasSubmitted,
  label,
  name,
  type,
  onBlur,
  onChange,
}: InputProps) {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    onChange?.(event);
    console.log(name, event.currentTarget.value);
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
        onChange={handleChange}
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
