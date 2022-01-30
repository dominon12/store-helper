import Head from "next/head";
import { NextPage } from "next";
import styled from "styled-components";

import PageTemplate from "../components/PageTemplate";
import Title from "../components/Title";
import { performGET, URLS } from "../services/api-service";
import { Product } from "../types/api-types";
import { RequestResult } from "../types/system-types";
import ProductsGrid from "../components/ProductsGrid";
import { observer } from "mobx-react-lite";
import userStore from "../store/userStore";
import Button from "../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
`;

interface Props {
  products: RequestResult<Product[]>;
}

const Products: NextPage<Props> = ({ products }) => {
  const router = useRouter();

  return (
    <PageTemplate>
      <Head>
        <title>Lista de Productos</title>
      </Head>

      <ProductsHeader>
        <div></div>
        <Title centered>Nuestros productos</Title>
        {userStore.isAuthenticated ? (
          <Button onClick={() => router.push("/products/add")}>Añadir</Button>
        ) : (
          <div></div>
        )}
      </ProductsHeader>

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

export default observer(Products);
