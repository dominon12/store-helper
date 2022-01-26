import { FC } from "react";
import styled from "styled-components";

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const Paragraph: FC = ({ children }) => {
  return <Text>{children}</Text>;
};

export default Paragraph;
