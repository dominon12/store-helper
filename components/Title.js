import styled from "styled-components";

const StyledH1 = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export default function Title({ children }) {
  return <StyledH1>{children}</StyledH1>;
}
