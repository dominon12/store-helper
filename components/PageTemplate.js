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
`;

const ContentWrapper = styled.main`
  padding: 1rem;
`;

export default function PageTemplate({ children }) {
  return (
    <PageWrapper>
      <Header />

      <ContentWrapper>{children}</ContentWrapper>

      <Footer />
    </PageWrapper>
  );
}
