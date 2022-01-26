import Head from "next/head";
import { NextPage } from "next";

import PageTemplate from "../components/PageTemplate";
import Title from "../components/Title";
import { performGET, URLS } from "../services/api-service";
import { Product } from "../types/api-types";
import { RequestResult } from "../types/system-types";
import ProductsGrid from "../components/ProductsGrid";

interface Props {
  products: RequestResult<Product[]>;
}

const Products: NextPage<Props> = ({ products }) => {
  console.log({ products });

  return (
    <PageTemplate>
      <Head>
        <title>Lista de Productos</title>
      </Head>

      <Title centered>Nuestros productos</Title>

      <ProductsGrid products={products} />
    </PageTemplate>
  );
};

export async function getServerSideProps() {
  const products = await performGET<Product[]>(URLS.products);

  return {
    props: { products },
  };
}

export default Products;
