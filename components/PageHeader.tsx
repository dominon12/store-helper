import { FC } from "react";
import styled from "styled-components";

import Title from "./Title";

const StyledPageHeader = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 415px) {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

interface Props {
  title: string;
  left?: JSX.Element;
  right?: JSX.Element;
}

const PageHeader: FC<Props> = (props) => {
  return (
    <StyledPageHeader>
      <Title centered>{props.title}</Title>
    </StyledPageHeader>
  );
};

export default PageHeader;
