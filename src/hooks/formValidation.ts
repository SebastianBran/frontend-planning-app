import { useEffect, useState } from "react";

interface formValidationProps {
  rules: any;
}

const FormValidation = ({ rules }: formValidationProps) => {
  const [errors, setErrors] = useState(Object);

  const validate = (data: any) => {
    let validateErrors = {};
    Object.keys(data).forEach((value) => {
      const index = value as keyof typeof rules as string;
      rules[index].forEach(
        (rule: { regex: { test: (arg0: any) => any }; message: any }) => {
          if (
            !rule.regex.test(data[index]) &&
            !Object.keys(validateErrors).includes(index)
          ) {
            validateErrors = { ...validateErrors, [index]: rule.message };
          }
        }
      );
    });
    setErrors({ ...validateErrors });
    return Object.keys(validateErrors).length === 0;
  };

  useEffect(() => {
    let values = {};
    Object.keys(rules).forEach((key) => {
      values = { ...values, [key]: undefined };
    });
    setErrors({ ...values });

    return () => {
      setErrors({});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { errors, validate };
};

export default FormValidation;
