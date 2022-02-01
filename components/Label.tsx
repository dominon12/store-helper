import { FC } from "react";
import styled from "styled-components";

const StyledH3 = styled.h3`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 415px) {
    font-size: 0.9rem;
  }
`;

interface Props {
  className?: string;
}

const Label: FC<Props> = ({ children, className }) => {
  return <StyledH3 className={className}>{children}</StyledH3>;
};

export default Label;
