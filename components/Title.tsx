import { FC } from "react";
import styled from "styled-components";

const StyledH1 = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Title: FC = ({ children }) => {
  return <StyledH1>{children}</StyledH1>;
};

export default Title;
