import { FC } from "react";
import styled from "styled-components";
import { Product } from "../types/api-types";
import { RequestResult } from "../types/system-types";
import ApiResponseTemplate from "./ApiResponseTemplate";

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

interface Props {
  products: RequestResult<Product[]>;
}

const ProductsGrid: FC<Props> = ({ products }) => {
  return (
    <ApiResponseTemplate
      render={() => <GridContainer></GridContainer>}
      error={products.error}
    />
  );
};

export default ProductsGrid;
