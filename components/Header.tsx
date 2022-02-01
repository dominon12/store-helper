import { FC } from "react";
import styled from "styled-components";
import { MdQrCodeScanner, MdMenuBook, MdExitToApp } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { observer } from "mobx-react-lite";

import MenuLink from "./MenuLink";
import userStore from "../store/userStore";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1.5rem 0;
  border-bottom: 2px solid var(--color-details);
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 425px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (max-width: 368px) {
    flex-direction: column;
  }
`;

const HeaderPart = styled.div`
  display: flex;
  align-items: center;

  :first-child {
    @media (max-width: 368px) {
      margin-bottom: 1rem;
    }
  }
`;

const Header: FC = () => {
  return (
    <StyledHeader>
      <HeaderPart>
        <MenuLink label="Escaner" href="/" Icon={MdQrCodeScanner} />
      </HeaderPart>
      <HeaderPart>
        <MenuLink label="Catálogo" href="/products" Icon={MdMenuBook} />
        {userStore.isAuthenticated ? (
          <MenuLink
            label="Log Out"
            href="/logout"
            Icon={MdExitToApp}
            withLeftMargin
          />
        ) : (
          <MenuLink label="Log In" href="/login" Icon={FaLock} withLeftMargin />
        )}
      </HeaderPart>
    </StyledHeader>
  );
};

export default observer(Header);
