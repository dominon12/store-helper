import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  color: var(--color-black);
  text-decoration: underline;
  cursor: pointer;
`;

const AuthorSign: FC = () => {
  return (
    <Link href="https://dominon12.web.app/" passHref>
      <StyledLink target="_blank" rel="noopener noreferrer">
        Made by Dominon12
      </StyledLink>
    </Link>
  );
};

export default AuthorSign;
