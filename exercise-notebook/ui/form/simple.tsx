"use client";
import React, { useState } from "react";

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

  return (
    <form>
      <Input
        name="id"
        label="아이디"
        onChange={handleChange}
        value={loginForm.id}
      />
      <Input
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
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, name, value, onChange }: InputProps) {
  return (
    <div>
      <div>
        <label htmlFor={`input-${name}`}>{label}</label>
      </div>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={`input-${name}`}
      />
    </div>
  );
}
