import {
  ChangeEvent,
  FC,
  forwardRef,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

import Label from "./Label";
import { Validators } from "../types/system-types";
import { validateFormField } from "../services/form-service";
import Paragraph from "./Paragraph";

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
  labelText: string;
  placeholderText: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  validators?: Validators;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref): JSX.Element => {
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (props.validators && touched) {
      const errors = validateFormField(props.value, props.validators);
      setErrors(errors);
    }
  }, [props.value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!touched) {
      setTouched(true);
    }

    props.setValue(e.target.value);
  };

  return (
    <FieldWrapper className={props.className}>
      <InputLabel required={props.required}>{props.labelText}</InputLabel>
      <InputField
        data-valid={props.required ? errors.length === 0 && touched : true}
        data-touched={touched}
        ref={ref}
        value={props.value}
        onChange={handleChange}
        placeholder={props.placeholderText}
        type={props.type}
        invalid={errors.length > 0 && touched}
      />
      {errors.length > 0 &&
        errors.map((error, index) => (
          <FieldError key={index}>{error}</FieldError>
        ))}
    </FieldWrapper>
  );
});

Input.displayName = "Input";
export default Input;
