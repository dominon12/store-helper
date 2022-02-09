import { FC } from "react";
import styled from "styled-components";

import ApiResponseTemplate from "./ApiResponseTemplate";
import ProductCard from "./ProductCard";
import { Product } from "../types/api-types";
import { RequestResult } from "../services/Requester";

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: 800px) {
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`;

interface Props {
  products: RequestResult<Product[]>;
}

const ProductsGrid: FC<Props> = ({ products }) => {
  return (
    <ApiResponseTemplate
      render={() => (
        <GridContainer>
          {products.data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </GridContainer>
      )}
      error={products.error}
    />
  );
};

export default ProductsGrid;
