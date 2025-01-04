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
