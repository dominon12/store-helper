import { FC } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
`;

const Header: FC = () => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
