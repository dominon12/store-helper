import { FC } from "react";
import styled from "styled-components";

const StyledH1 = styled.h1<{ centered?: boolean }>`
  font-size: 2rem;
  margin: 0;
  margin-bottom: 2.5rem;
  margin-top: 1.5rem;
  text-align: ${(props) => (props.centered ? "center" : "left")};
`;

interface Props {
  centered?: boolean;
}

const Title: FC<Props> = ({ children, centered }) => {
  return <StyledH1 centered={centered}>{children}</StyledH1>;
};

export default Title;
