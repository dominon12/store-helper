import { ChangeEvent, useEffect, useState } from "react";
import { validateFormField } from "../services/form-service";
import { Validators } from "../types/system-types";

interface FormFieldProps<FieldType> {
  setValue: (e: ChangeEvent<FieldType>) => void;
  required?: boolean;
  validators?: Validators;
  value?: string;
}

function useFormFieldProps<FieldType>(props: FormFieldProps<FieldType>) {
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (props.validators && touched) {
      const errors = validateFormField(props.value ?? "", props.validators);
      setErrors(errors);
    }
  }, [props.value]);

  const handleChange = (e: ChangeEvent<FieldType>) => {
    !touched && setTouched(true);
    props.setValue(e);
  };

  return {
    "data-valid": props.required ? errors.length === 0 && touched : true,
    invalid: errors.length > 0 && touched,
    value: props.value,
    onChange: handleChange,
    errors,
  };
}

export default useFormFieldProps;
