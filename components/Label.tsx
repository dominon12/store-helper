import { FC } from "react";
import styled from "styled-components";

const StyledH3 = styled.h3`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const Label: FC = ({ children }) => {
  return <StyledH3>{children}</StyledH3>;
};

export default Label;
