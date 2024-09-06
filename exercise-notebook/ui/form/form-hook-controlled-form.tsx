"use client";
import React, { ReactText, useState } from "react";
import { useForm } from "./use-form";

interface LoginFormData {
  id: string;
  password: string;
  isMarketing: boolean;
  age: number;
  gender: string;
  location: string;
  birthday: string;
}

type LoginFormError = {
  [name in keyof LoginFormData]: string;
};

const locationsData = [
  {
    name: "us",
    value: "text1",
  },
  {
    name: "korea",
    value: "text2",
  },
  {
    name: "mexico",
    value: "text3",
  },
  {
    name: "france",
    value: "text4",
  },
  {
    name: "japan",
    value: "text5",
  },
];

export default function FormHookControlledForm() {
  const {
    formState: loginForm,
    errorMessage,
    wasSubmitted,
    handleChange,
    vaidateForm,
    handleSubmit,
    updateFormState,
  } = useForm<LoginFormData>({
    initialState: {
      id: "",
      password: "",
      isMarketing: false,
      age: 0,
      gender: "",
      location: "",
      birthday: "",
    },
    validateFn: validateLoginForm,
  });

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
      <SearchInput
        label="지역 검색"
        value={loginForm.location}
        errorMessage={errorMessage.location}
        wasSubmitted={wasSubmitted}
        onChange={handleChange}
        name="location"
        searchListData={locationsData}
        searchRender={(data) => {
          return (
            <div
              onClick={() => {
                updateFormState({ location: data.name });
              }}
            >
              {data.name}
            </div>
          );
        }}
        searchFilter={(data) => data.name.includes(loginForm.location)}
      />
      <DateInput
        name="birthday"
        value={loginForm.birthday}
        errorMessage={errorMessage.birthday}
        label="생일"
        wasSubmitted={wasSubmitted}
        onChange={handleChange}
        min="2024-07-18"
      />
      <button type="submit">로그인</button>
    </form>
  );
}

interface DateInputPros extends Omit<InputProps, "type"> {
  max?: string;
  min?: string;
}

function DateInput({ ...props }: DateInputPros) {
  return <Input type={"date"} {...props} />;
}

interface SearchInputProps<T> extends Omit<InputProps, "type"> {
  searchListData: T[];
  searchRender: (data: T) => React.ReactNode;
  searchFilter: (data: T) => boolean;
}

function SearchInput<T>({
  searchListData,
  value,
  searchRender,
  searchFilter,
  ...props
}: SearchInputProps<T>) {
  const [open, setOpen] = useState(false);

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onFocus?.(event);
    setOpen(true);
  };

  const handleUnderlayClick = () => {
    setOpen(false);
  };

  const searchedList = searchListData.filter(searchFilter);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {open && (
        <div
          style={{
            position: "fixed",
            inset: "0px",
          }}
          aria-hidden={true}
          onClick={handleUnderlayClick}
        ></div>
      )}
      <Input
        value={value}
        type={"search"}
        {...props}
        onFocus={handleInputFocus}
      />
      {open && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
          }}
        >
          {
            <div>
              {searchedList.map((data) => {
                return searchRender(data);
              })}
            </div>
          }
        </div>
      )}
    </div>
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
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
  ...props
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
        {...props}
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
        <label
          key={input}
          id={`label-${name}-${idx}`}
          htmlFor={`input-${name}-${idx}`}
        >
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
    location: loginForm.location === "" ? "지역을 선택해주세요" : "",
    birthday: loginForm.birthday === "" ? "생일을 선택해주세요" : "",
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
