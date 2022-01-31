import { FC, FormEvent } from "react";
import styled from "styled-components";
import Button from "./Button";
import ErrorData from "./ErrorData";

const Form = styled.form`
  width: 450px;
  margin: 0 auto;
`;

interface Props {
  submitCallback: () => void;
  errors: string[];
  isLoading: boolean;
  isValid: boolean;
  buttonText: string;
}

const FormTemplate: FC<Props> = (props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.submitCallback();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {props.children}

      <ErrorData errorMessage={props.errors.join(", ")} />

      <Button loading={props.isLoading} disabled={!props.isValid}>
        {props.buttonText}
      </Button>
    </Form>
  );
};

export default FormTemplate;
