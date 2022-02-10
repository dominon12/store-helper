import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";

import { Validators } from "./../types/system-types";

export function validateFormField(value: string, validators: Validators) {
  const errors = [];

  const emptyStringValidator = validators.emptyStringValidator;
  if (emptyStringValidator) {
    if (value.length === 0) {
      errors.push("Este campo no puede estar vacío");
    }
  }

  const minLengthValidator = validators.minLengthValidator;
  if (!!minLengthValidator) {
    if (value.length < minLengthValidator) {
      errors.push(
        `Este campo debe tener al menos ${minLengthValidator} caracteres de longitud`
      );
    }
  }

  const maxLengthValidator = validators.maxLengthValidator;
  if (!!maxLengthValidator) {
    if (value.length > maxLengthValidator) {
      errors.push(
        `Este campo no puede ser más largo que ${maxLengthValidator} caracteres`
      );
    }
  }

  return errors;
}

export const changeFieldValue =
  (
    fieldName: string,
    setFormData: Dispatch<
      SetStateAction<{
        [key: string]: string;
      }>
    >
  ) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

export function checkFormValid(
  formFields: RefObject<HTMLInputElement | HTMLTextAreaElement>[]
) {
  const invalidFields = formFields.filter(
    (formFieldRef) => formFieldRef?.current?.dataset.valid === "false"
  );

  return invalidFields.length === 0;
}

export function makeFormValid(
  formFields: RefObject<HTMLInputElement | HTMLTextAreaElement>[]
) {
  formFields.forEach((formFieldRef) => {
    if (formFieldRef?.current?.dataset) {
      formFieldRef.current.dataset.valid = "true";
    }
  });
}
