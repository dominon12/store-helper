import {
  ChangeEvent,
  forwardRef,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import styled, { css } from "styled-components";

import Label from "./Label";
import { Validators } from "../types/system-types";
import { validateFormField } from "../services/form-service";
import Paragraph from "./Paragraph";
import useFormFieldProps from "../hooks/useFormFieldProps";

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

const formFieldStyles = css<{ invalid: boolean }>`
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

const InputField = styled.input<{ invalid: boolean }>`
  ${formFieldStyles}
`;

const FieldError = styled(Paragraph)`
  color: var(--color-details);
`;

interface Props {
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  placeholderText: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  required?: boolean;
  validators?: Validators;
  className?: string;
  accept?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref): JSX.Element => {
  const { errors, ...formFieldProps } = useFormFieldProps<HTMLInputElement>({
    setValue: props.setValue,
    required: props.required,
    validators: props.validators,
    value: props.value,
  });

  const allProps = {
    ...formFieldProps,
    ref,
    placeholder: props.placeholderText,
    required: props.required,
    type: props.type,
    accept: props.accept,
  };

  return (
    <FieldWrapper className={props.className}>
      <InputLabel required={props.required}>{props.labelText}</InputLabel>

      <InputField {...allProps} />

      {errors.length > 0 &&
        errors.map((error, index) => (
          <FieldError key={index}>{error}</FieldError>
        ))}
    </FieldWrapper>
  );
});

Input.displayName = "Input";
export default Input;
