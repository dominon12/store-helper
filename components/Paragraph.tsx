import { FC } from "react";
import styled from "styled-components";

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
`;

interface Props {
  className?: string;
}

const Paragraph: FC<Props> = ({ children, className }) => {
  return <Text className={className}>{children}</Text>;
};

export default Paragraph;
