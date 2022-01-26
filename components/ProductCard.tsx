import { FC } from "react";
import Image from "next/image";
import styled from "styled-components";

import Label from "./Label";
import { Product } from "../types/api-types";
import Paragraph from "./Paragraph";
import Link from "next/link";

const Card = styled.a`
  border-radius: 4px;
  padding: 1rem;
  background-color: var(--color-white);
  color: unset;
  text-decoration: none;
  transition: var(--transition-off);
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;

  :hover,
  :focus {
    transition: var(--transition-on);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    transform: scale(1.05);
  }
`;

const ProductImage = styled(Image)`
  height: 350px;
  width: 100%;
  object-fit: contain;
`;

const Name = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Link href={`/products/${product.pk}`} passHref>
      <Card>
        <ProductImage
          loader={() => product.image}
          src={product.image}
          height={350}
          width={430}
        />
        <Name>
          <Label>{product.name}</Label>
        </Name>
        <Paragraph>{product.price} €</Paragraph>
      </Card>
    </Link>
  );
};

export default ProductCard;
