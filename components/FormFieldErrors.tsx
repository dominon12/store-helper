import { FC } from "react";
import styled from "styled-components";

import Paragraph from "./Paragraph";

const FieldError = styled(Paragraph)`
  max-width: 390px;
  color: var(--color-details);
`;

interface Props {
  errors: string[];
}

const FormFieldErrors: FC<Props> = (props) => {
  return props.errors.length > 0 ? (
    <>
      {props.errors.map((error, index) => (
        <FieldError key={index}>{error}</FieldError>
      ))}
    </>
  ) : null;
};

export default FormFieldErrors;
