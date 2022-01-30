import { FC } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  border: 2px dotted var(--color-gray);
  border-radius: 4px;
  background-color: white;
  padding: 0.7rem 1rem;

  ::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: -2px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #111;
    border-radius: 4px;
    display: block;
    transform: translate(12px, 12px);
    transition: transform var(--transition-off) ease-out;
  }

  :hover,
  :focus {
    ::after {
      transform: translate(0, 0);
      transition: transform var(--transition-on) ease-out;
    }
  }
`;

interface Props {}

const Button: FC<Props> = (props) => {
  return <StyledButton>{props.children}</StyledButton>;
};

export default Button;
