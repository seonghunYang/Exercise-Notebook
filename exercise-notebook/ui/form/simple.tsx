"use client";
import React, { useEffect, useRef, useState } from "react";

export default function SimpleForm() {
  const [loginForm, setLoginForm] = useState({
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
    // console.log(
    console.log(event);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        type="text"
        isRequired={true}
        name="id"
        label="아이디"
        onChange={handleChange}
        value={loginForm.id}
      />
      <Input
        type="password"
        name="password"
        label="비밀번호"
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  type = "text",
  label,
  name,
  value,
  isRequired,
  onChange,
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [touced, setTouched] = useState(false);
  const errorMessage = ref.current ? [ref.current.validationMessage] : [];
  const displayErrorMessage = touced && errorMessage;

  const handleBlur = () => {
    setTouched(true);
  };
  const hanldeFocust = () => {
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
        onChange={onChange}
        onFocus={hanldeFocust}
        onBlur={handleBlur}
        value={value}
        name={name}
        id={`input-${name}`}
        aria-labelledby={`label-${name}`}
        aria-describedby={`error-${name}`}
      />
      <div id={`error-${name}`}>
        {displayErrorMessage &&
          displayErrorMessage.map((message) => (
            <div key={message}>{message}</div>
          ))}
      </div>
    </div>
  );
}
