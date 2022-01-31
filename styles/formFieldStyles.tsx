import { css } from "styled-components";

const formFieldStyles = css<{ invalid: boolean }>`
  width: 100%;
  padding: 0.8rem;
  outline: none;
  border: 2px solid var(--color-light-gray);
  border-radius: 6px;
  transition: border-color var(--transition-on) ease;

  ${(props) => props.invalid && "border-color: var(--color-details);"};

  :hover,
  :focus {
    border-color: ${(props) => !props.invalid && "var(--color-gray)"};
    transition: border-color var(--transition-on) ease;
  }
`;

export default formFieldStyles;
