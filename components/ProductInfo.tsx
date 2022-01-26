import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";
import { Product } from "../types/api-types";
import Label from "./Label";
import Paragraph from "./Paragraph";
import Title from "./Title";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 75vh;
`;

const Content = styled.article`
  display: flex;
  justify-content: center;
`;

const ProductImage = styled(Image)`
  && {
    width: 50%;
    height: 100%;
    object-fit: contain;
  }
`;

const ProductData = styled.section`
  padding: 0 1.5rem;
  width: 50%;
`;

const Description = styled(Paragraph)`
  && {
    margin: 2rem 0;
  }
`;

interface Props {
  product: Product;
}

const ProductInfo: FC<Props> = ({ product }) => {
  return (
    <Wrapper>
      <Content>
        <ProductImage
          src={product.image}
          loader={() => product.image}
          alt={product.name}
          height={450}
          width={450}
        />
        <ProductData>
          <Title>{product.name}</Title>
          <Description>{product.description}</Description>
          <Label>{product.price} €</Label>
        </ProductData>
      </Content>
    </Wrapper>
  );
};

export default ProductInfo;
