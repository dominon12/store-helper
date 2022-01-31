import { FC } from "react";
import styled from "styled-components";
import FormFieldErrors from "./FormFieldErrors";
import Label from "./Label";

const FieldWrapper = styled.label`
  display: block;
`;

const InputLabel = styled(Label)<{ required?: boolean }>`
  margin-bottom: 0.2rem;

  ${(props) =>
    props.required &&
    `
    ::after {
      content: "*";
      color: red;
      margin-left: 0.5rem;
    }
  `}
`;

interface Props {
  labelText: string;
  errors: string[];
  className?: string;
  required?: boolean;
}

const FormFieldWrapper: FC<Props> = (props) => {
  return (
    <FieldWrapper className={props.className}>
      <InputLabel required={props.required}>{props.labelText}</InputLabel>
      {props.children}
      <FormFieldErrors errors={props.errors} />
    </FieldWrapper>
  );
};

export default FormFieldWrapper;
