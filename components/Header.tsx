import { FC } from "react";
import styled from "styled-components";
import { MdQrCodeScanner, MdMenuBook } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import MenuLink from "./MenuLink";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  /* height: 80px; */
  padding: 0.5rem;
  border-bottom: 1px solid var(--color-details);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderPart = styled.div`
  display: flex;
  align-items: center;
`;

const Header: FC = () => {
  return (
    <StyledHeader>
      <HeaderPart>
        <MenuLink label="Escaner" href="/" Icon={MdQrCodeScanner} />
      </HeaderPart>
      <HeaderPart>
        <MenuLink label="Catálogo" href="/products" Icon={MdMenuBook} />
        <MenuLink label="Login" href="/login" Icon={FaLock} withLeftMargin />
      </HeaderPart>
    </StyledHeader>
  );
};

export default Header;
