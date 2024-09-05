import React, { useState } from "react";

interface UseFormArgs<T extends Record<string, any>> {
  initialState: T;
  validateFn: (formState: T) => ErrorMessage<T>;
}

type ErrorMessage<T extends Record<string, any>> = {
  [key in keyof T]: string;
};

export function useForm<T extends Record<string, any>>({
  initialState,
  validateFn,
}: UseFormArgs<T>) {
  const [formState, setFormState] = useState<T>(initialState);
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

  const initialErrorMessage = (Object.keys(initialState) as (keyof T)[]).reduce<
    ErrorMessage<T>
  >(
    (acc, key) => {
      acc[key] = "";
      return acc;
    },
    { ...initialState }
  );

  const [errorMessage, setErrorMessage] =
    useState<ErrorMessage<T>>(initialErrorMessage);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setFormState({
      ...formState,
      [event.currentTarget.name]:
        event.currentTarget.type === "checkbox" &&
        typeof formState[event.currentTarget.name] === "boolean"
          ? event.currentTarget.checked
          : event.currentTarget.value,
    });
  };

  const vaidateForm = () => {
    const errorMessage = validateFn(formState);
    setErrorMessage(errorMessage);
    return Object.values(errorMessage).every((v) => v === "");
  };

  const handleSubmit = (onSubmit: (formData: T) => void) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setWasSubmitted(true);

      onSubmit(formState);
    };
  };

  return {
    formState,
    errorMessage,
    wasSubmitted,
    handleChange,
    vaidateForm,
    handleSubmit,
    setErrorMessage,
  };
}
