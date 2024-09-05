"use client";
import React, { ReactText, useState } from "react";
import { useForm } from "./use-form";

interface LoginFormData {
  id: string;
  password: string;
  isMarketing: boolean;
  age: number;
  gender: string;
}

type LoginFormError = {
  [name in keyof LoginFormData]: string;
};

export default function FormHookControlledForm() {
  const {
    formState: loginForm,
    errorMessage,
    wasSubmitted,
    handleChange,
    vaidateForm,
    handleSubmit,
  } = useForm<LoginFormData>({
    initialState: {
      id: "",
      password: "",
      isMarketing: false,
      age: 0,
      gender: "",
    },
    validateFn: validateLoginForm,
  });

  console.log(loginForm);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    vaidateForm();
  };

  const onSubmit = (formData: LoginFormData) => {
    const valid = vaidateForm();

    if (!valid) {
      return;
    }

    alert(JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Input
        label="나이"
        name="age"
        type="number"
        value={loginForm.age}
        errorMessage={errorMessage.age}
        wasSubmitted={wasSubmitted}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        label="약관 동의"
        name="isMarketing"
        type="checkbox"
        value={"isMarketing"}
        checked={loginForm.isMarketing}
        errorMessage={errorMessage["isMarketing"]}
        wasSubmitted={wasSubmitted}
        onChange={handleChange}
      />
      <RadioInput
        label="성별"
        inputs={["boys", "girs"]}
        value={loginForm.gender}
        onChange={handleChange}
        errorMessage={errorMessage.gender}
        wasSubmitted={wasSubmitted}
        name="gender"
      />
      <button type="submit">로그인</button>
    </form>
  );
}

interface InputProps {
  value: string | number;
  errorMessage: string;
  wasSubmitted: boolean;
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  checked?: boolean;
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
  checked,
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
        checked={checked}
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

interface RadioInputProps {
  value: string;
  errorMessage: string;
  wasSubmitted: boolean;
  label: string;
  name: string;
  inputs: string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function RadioInput({
  value,
  name,
  label,
  wasSubmitted,
  errorMessage,
  inputs,
  onChange,
}: RadioInputProps) {
  return (
    <div>
      <span>{label}</span>
      {inputs.map((input, idx) => (
        <label id={`label-${name}-${idx}`} htmlFor={`input-${name}-${idx}`}>
          <input
            type={"radio"}
            name={name}
            checked={value === input}
            id={`input-${name}-${idx}`}
            value={input}
            onChange={onChange}
            aria-labelledby={`label-${name}=${idx}`}
            aria-describedby={`error-${name}`}
            aria-invalid={errorMessage ? true : false}
          />
          {input}
        </label>
      ))}
      {errorMessage && wasSubmitted && (
        <div id={`error-${name}`}>{errorMessage}</div>
      )}
    </div>
  );
}

function validateLoginForm(loginForm: LoginFormData): LoginFormError {
  return {
    id: validateId(loginForm.id),
    password: validatePassword(loginForm.password),
    isMarketing: validateMarketing(loginForm.isMarketing),
    age: "",
    gender: loginForm.gender === "" ? "성별을 선택해주세요" : "",
  };
}

function validateMarketing(value: boolean): string {
  if (!value) {
    return "약관에 동의해주세요";
  }
  return "";
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
