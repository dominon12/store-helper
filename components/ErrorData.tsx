import { FC } from "react";
import styled from "styled-components";
import Label from "./Label";

const ErrorContainer = styled.section`
  background-color: var(--error-color);
  padding: 1rem;
  margin: 1rem 0;
`;

interface Props {
  className?: string;
  errorMessage?: string | null;
}

const ErrorData: FC<Props> = ({ errorMessage, className }) => {
  return errorMessage ? (
    <ErrorContainer className={className}>
      <Label>{errorMessage}</Label>
    </ErrorContainer>
  ) : null;
};

export default ErrorData;
