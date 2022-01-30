import { FC, FormEvent, useState } from "react";
import styled from "styled-components";

import { FormData } from "../types/system-types";
import Button from "./Button";
import Input from "./Input";

const Form = styled.form`
  width: 450px;
  margin: 0 auto;
`;

const FormField = styled(Input)`
  margin-bottom: 1rem;
`;

const LoginForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: { value: "", errors: [], touched: false },
    password: { value: "", errors: [], touched: false },
  });

  const changeFieldData =
    <T extends unknown>(fieldName: string, propName: keyof FormData[""]) =>
    (value: T) => {
      const formDataCopy = JSON.parse(JSON.stringify(formData));
      formDataCopy[fieldName][propName] = value;
      setFormData(formDataCopy);
    };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormField
        value={formData.username.value}
        setValue={changeFieldData("username", "value")}
        errors={formData.username.errors}
        setErrors={changeFieldData("username", "errors")}
        touched={formData.username.touched}
        setTouched={changeFieldData("username", "touched")}
        labelText="Nombre de usuario"
        placeholderText="Username"
        type="text"
        validators={{
          emptyStringValidator: true,
          minLengthValidator: 8,
          maxLengthValidator: 15,
        }}
      />
      <FormField
        value={formData.password.value}
        setValue={changeFieldData("password", "value")}
        errors={formData.password.errors}
        setErrors={changeFieldData("password", "errors")}
        touched={formData.password.touched}
        setTouched={changeFieldData("password", "touched")}
        labelText="Contraseña"
        placeholderText="Password"
        type="password"
        validators={{
          emptyStringValidator: true,
          minLengthValidator: 8,
          maxLengthValidator: 15,
        }}
      />
      <Button>Iniciar sesión</Button>
    </Form>
  );
};

export default LoginForm;
