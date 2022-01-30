import { FC } from "react";
import styled from "styled-components";
import Label from "./Label";

const ErrorContainer = styled.section`
  background-color: var(--error-color);
  padding: 1rem;
  margin: 1rem 0;
`;

interface Props {
  errorMessage: string;
}

const ErrorData: FC<Props> = ({ errorMessage }) => {
  return (
    <ErrorContainer>
      <Label>{errorMessage}</Label>
    </ErrorContainer>
  );
};

export default ErrorData;
