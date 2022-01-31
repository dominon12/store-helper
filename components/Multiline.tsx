import { ChangeEvent, forwardRef } from "react";
import styled from "styled-components";

import FormFieldWrapper from "./FormFieldWrapper";
import { Validators } from "../types/system-types";
import useFormFieldProps from "../hooks/useFormFieldProps";
import formFieldStyles from "../styles/formFieldStyles";

const TextAreaField = styled.textarea<{ invalid: boolean }>`
  ${formFieldStyles}
`;

interface Props {
  setValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  labelText: string;
  placeholderText: string;
  value?: string;
  required?: boolean;
  validators?: Validators;
  className?: string;
}

const Multiline = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref): JSX.Element => {
    const { errors, ...formFieldProps } =
      useFormFieldProps<HTMLTextAreaElement>({
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
    };

    return (
      <FormFieldWrapper
        labelText={props.labelText}
        className={props.className}
        required={props.required}
        errors={errors}
      >
        <TextAreaField {...allProps} />
      </FormFieldWrapper>
    );
  }
);

Multiline.displayName = "Multiline";
export default Multiline;
