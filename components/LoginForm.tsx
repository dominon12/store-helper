import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import userStore from "../store/userStore";

import Button from "./Button";
import ErrorData from "./ErrorData";
import Input from "./Input";

const Form = styled.form`
  width: 450px;
  margin: 0 auto;
`;

const FormField = styled(Input)`
  margin-bottom: 1rem;
`;

const LoginForm: FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [formValid, setFormValid] = useState(false);

  const checkFormValid = () => {
    const formFields = [usernameInputRef, passwordInputRef];

    const invalidFields = formFields.filter(
      (formFieldRef) => formFieldRef?.current?.dataset.valid === "false"
    );

    return invalidFields.length === 0;
  };

  useEffect(() => {
    const valid = checkFormValid();
    setFormValid(valid);
  }, [formData]);

  const changeFieldValue = (fieldName: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await userStore.authenticate(formData.username, formData.password);

    if (userStore.errors.length === 0) {
      router.push("/products");
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormField
        ref={usernameInputRef}
        value={formData.username}
        setValue={changeFieldValue("username")}
        labelText="Nombre de usuario"
        placeholderText="Username"
        type="text"
        validators={{
          emptyStringValidator: true,
          minLengthValidator: 8,
          maxLengthValidator: 15,
        }}
        required
      />
      <FormField
        ref={passwordInputRef}
        value={formData.password}
        setValue={changeFieldValue("password")}
        labelText="Contraseña"
        placeholderText="Password"
        type="password"
        validators={{
          emptyStringValidator: true,
          minLengthValidator: 8,
          maxLengthValidator: 15,
        }}
        required
      />

      <ErrorData errorMessage={userStore.errors.join(", ")} />

      <Button loading={userStore.isLoading} disabled={!formValid}>
        Iniciar sesión
      </Button>
    </Form>
  );
};

export default observer(LoginForm);
