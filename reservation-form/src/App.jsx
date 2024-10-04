import { useState } from "react";

import "./App.css";

function useForm(initialData, validateFn) {
  const [formData, setFormData] = useState(initialData);

  const [errorMessages, setErrorMessages] = useState(
    Object.keys(initialData).reduce((acc, key) => {
      return {
        ...acc,
        [key]: "",
      };
    }, {})
  );

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const validationResult = validateFn(formData);
    setErrorMessages({ ...errorMessages, ...validationResult });

    return Object.entries(validationResult).every(
      ([key, value]) => value === ""
    );
  };

  const handleSubmit = (onSubmit) => {
    return (e) => {
      e.preventDefault();

      // 유효성 검증
      if (validate()) {
        onSubmit?.(formData);
        setFormData(initialData);
      }

      // 성공하면 onSubmit
    };
  };

  return {
    formData,
    errorMessages,
    handleFormDataChange,
    handleSubmit,
  };
}

function validate(formData) {
  return {
    phone: !formData.phone.match(/^[0-9]{11}$/) ? "숫자만 포함해주세요" : "",
  };
}

function App() {
  const { formData, errorMessages, handleFormDataChange, handleSubmit } =
    useForm(
      {
        name: "",
        email: "",
        phone: "",
        reservationData: "",
        reservatiionTime: "",
        count: 0,
      },
      validate
    );

  console.log(errorMessages);

  return (
    <form onSubmit={handleSubmit()}>
      <Input
        name="name"
        type="text"
        value={formData.name}
        label="이름"
        onChange={handleFormDataChange}
        errorMessage={errorMessages.name}
      />
      <Input
        name="email"
        type="email"
        value={formData.email}
        label="이메일"
        onChange={handleFormDataChange}
        errorMessage={errorMessages.email}
      />
      <Input
        name="phone"
        type="tel"
        value={formData.phone}
        label="전화번호"
        onChange={handleFormDataChange}
        errorMessage={errorMessages.phone}
      />
      <Input
        name="reservationData"
        type="date"
        value={formData.reservationData}
        label="예약 날짜"
        onChange={handleFormDataChange}
        errorMessage={errorMessages.reservationData}
      />
      <Input
        name="count"
        type="number"
        value={formData.count}
        label="인원수"
        onChange={handleFormDataChange}
      />
      <button type="submit">제출</button>
    </form>
  );
}

function Input({ label, name, errorMessage, ...props }) {
  return (
    <div>
      <label id={`label-${name}`} htmlFor={`input-${name}`}>
        {label}
      </label>
      <input
        {...props}
        id={`input-${name}`}
        name={name}
        aria-labelledby={`label-${name}`}
        aria-describedby={`error-${name}`}
        aria-invalid={errorMessage ? true : false}
      />
      {errorMessage && <div id={`error-${name}`}>{errorMessage}</div>}
    </div>
  );
}

export default App;
