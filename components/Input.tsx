import { ChangeEvent, forwardRef, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

import FormFieldWrapper from "./FormFieldWrapper";
import { Validators } from "../types/system-types";
import useFormFieldProps from "../hooks/useFormFieldProps";
import formFieldStyles from "../styles/formFieldStyles";

const InputField = styled.input<{ invalid: boolean }>`
  ${formFieldStyles}
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
    <FormFieldWrapper
      labelText={props.labelText}
      className={props.className}
      required={props.required}
      errors={errors}
    >
      <InputField {...allProps} />
    </FormFieldWrapper>
  );
});

Input.displayName = "Input";
export default Input;
