import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { changeFieldValue, checkFormValid } from "../services/form-service";
import userStore from "../store/userStore";
import FormTemplate from "./FormTemplate";
import Input from "./Input";

const FormField = styled(Input)`
  margin-bottom: 1rem;
`;

const LoginForm: FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    username: "",
    password: "",
  });
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const valid = checkFormValid([usernameInputRef, passwordInputRef]);
    setFormValid(valid);
  }, [formData]);

  const handleFormSubmit = async () => {
    await userStore.authenticate(formData.username, formData.password);

    if (userStore.errors.length === 0) {
      router.push("/products");
    }
  };

  return (
    <FormTemplate
      submitCallback={handleFormSubmit}
      errors={userStore.errors}
      isLoading={userStore.isLoading}
      isValid={formValid}
      buttonText="Iniciar sesión"
    >
      <FormField
        ref={usernameInputRef}
        value={formData.username}
        setValue={changeFieldValue("username", setFormData)}
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
        setValue={changeFieldValue("password", setFormData)}
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
    </FormTemplate>
  );
};

export default observer(LoginForm);
