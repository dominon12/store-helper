import { FC } from "react";
import styled from "styled-components";

import Footer from "./Footer";
import Header from "./Header";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 425px) {
    padding: 0;
  }
`;

const ContentWrapper = styled.main`
  padding: 1rem 0;
  padding-bottom: 2rem;

  @media (max-width: 425px) {
    padding: 0 1rem;
    padding-bottom: 2rem;
  }
`;

const PageTemplate: FC = ({ children }) => {
  return (
    <PageWrapper>
      <Header />

      <ContentWrapper>{children}</ContentWrapper>

      <Footer />
    </PageWrapper>
  );
};

export default PageTemplate;
