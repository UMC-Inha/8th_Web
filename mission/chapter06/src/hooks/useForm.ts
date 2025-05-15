import { useState } from "react";

export function useForm(initialValues: any, validators: any) {
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState(() => {
    const temp: any = {};
    for (let key in initialValues) {
      temp[key] = "";
    }
    return temp;
  });

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });

    if (validators[name]) {
      const msg = validators[name](value);
      setErrors({
        ...errors,
        [name]: msg,
      });
    }
  };

  const isValid =
    Object.values(errors).every((e) => e === "") &&
    Object.values(values).every((v) => v !== "");

  return {
    values,
    errors,
    handleChange,
    isValid,
  };
}
