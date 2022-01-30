import { FC, HTMLInputTypeAttribute, useEffect } from "react";
import styled from "styled-components";

import Label from "./Label";
import { Validators } from "../types/system-types";
import { validateFormField } from "../services/form-service";
import Paragraph from "./Paragraph";

const FieldWrapper = styled.label`
  display: block;
`;

const InputLabel = styled(Label)`
  margin-bottom: 0.2rem;
`;

const InputField = styled.input<{ invalid: boolean }>`
  width: 100%;
  padding: 0.8rem;
  outline: none;
  border: 2px solid var(--color-light-gray);
  border-radius: 6px;
  transition: border-color var(--transition-on) ease;

  ${(props) => props.invalid && "border-color: var(--color-details);"};

  :hover,
  :focus {
    border-color: ${(props) => !props.invalid && "var(--color-gray)"};
    transition: border-color var(--transition-on) ease;
  }
`;

const FieldError = styled(Paragraph)`
  color: var(--color-details);
`;

interface Props {
  value: string;
  setValue: (value: string) => void;
  errors: string[];
  setErrors: (errors: string[]) => void;
  touched: boolean;
  setTouched: (touched: boolean) => void;
  labelText: string;
  placeholderText: string;
  type: HTMLInputTypeAttribute;
  validators?: Validators;
  className?: string;
}

const Input: FC<Props> = (props) => {
  useEffect(() => {
    if (!props.touched) {
      props.setTouched(true);
    }

    if (props.validators && props.touched) {
      const errors = validateFormField(props.value, props.validators);
      props.setErrors(errors);
    }
  }, [props.value]);

  return (
    <FieldWrapper className={props.className}>
      <InputLabel>{props.labelText}</InputLabel>
      <InputField
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        placeholder={props.placeholderText}
        type={props.type}
        invalid={props.errors.length > 0 && props.touched}
      />
      {props.errors.length > 0 &&
        props.errors.map((error, index) => (
          <FieldError key={index}>{error}</FieldError>
        ))}
    </FieldWrapper>
  );
};

export default Input;
