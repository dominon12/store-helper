import { FC } from "react";
import styled from "styled-components";

import AuthorSign from "./AuthorSign";

const StyledFooter = styled.footer`
  margin-top: auto;
  padding: 1rem;
  border-top: 2px solid var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer: FC = () => {
  return (
    <StyledFooter>
      <AuthorSign />
    </StyledFooter>
  );
};

export default Footer;
