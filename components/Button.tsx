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

  :not(:disabled):hover,
  :not(:disabled):focus {
    ::after {
      transform: translate(8px, 8px);
      transition: transform var(--transition-on) ease-out;
    }
  }

  :not(:disabled):active {
    ::after {
      transform: translate(0, 0);
      transition: transform var(--transition-on) ease-out;
    }
  }

  :disabled {
    color: var(--color-gray);
    border-color: var(--color-light-gray);
    cursor: not-allowed;

    ::after {
      background-color: var(--color-gray);
    }
  }
`;

interface Props {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<Props> = (props) => {
  return (
    <StyledButton
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
    >
      {props.loading ? "Cargando..." : props.children}
    </StyledButton>
  );
};

export default Button;
