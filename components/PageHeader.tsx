import { FC } from "react";
import styled from "styled-components";

import Title from "./Title";

const StyledPageHeader = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  position: relative;

  @media (max-width: 415px) {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const HeaderPart = styled.div<{ position: "left" | "right" }>`
  position: absolute;
  top: 0;
  ${(props) => (props.position === "left" ? "left: 0;" : "right: 0")}
`;

interface Props {
  title: string;
  left?: JSX.Element;
  right?: JSX.Element;
}

const PageHeader: FC<Props> = (props) => {
  return (
    <StyledPageHeader>
      <HeaderPart position="left">{props.left && props.left}</HeaderPart>
      <Title centered>{props.title}</Title>
      <HeaderPart position="right">{props.right && props.right}</HeaderPart>
    </StyledPageHeader>
  );
};

export default PageHeader;
