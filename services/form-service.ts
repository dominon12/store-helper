import { Validators } from "./../types/system-types";

export function validateFormField(value: string, validators: Validators) {
  const errors = [];

  const emptyStringValidator = validators.emptyStringValidator;
  if (emptyStringValidator) {
    if (value.length === 0) {
      errors.push("This field can't be empty");
    }
  }

  const minLengthValidator = validators.minLengthValidator;
  if (!!minLengthValidator) {
    if (value.length < minLengthValidator) {
      errors.push(
        `This field must be at least ${minLengthValidator} characters long`
      );
    }
  }

  const maxLengthValidator = validators.maxLengthValidator;
  if (!!maxLengthValidator) {
    if (value.length > maxLengthValidator) {
      errors.push(
        `This field can't be longer than ${maxLengthValidator} characters long`
      );
    }
  }

  return errors;
}
