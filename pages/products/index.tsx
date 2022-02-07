import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import { performGET, URLS } from "../../services/api-service";
import { Product } from "../../types/api-types";
import { RequestResult } from "../../types/system-types";
import ProductsGrid from "../../components/ProductsGrid";
import userStore from "../../store/userStore";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: -1.5rem;

  @media (max-width: 415px) {
    margin-top: -1rem;
  }
`;

interface Props {
  products: RequestResult<Product[]>;
}

const Products: NextPage<Props> = ({ products }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Lista de Productos</title>
      </Head>

      <PageHeader title="Nuestros productos" />

      {userStore.isAuthenticated && userStore.user?.isAdmin ? (
        <ButtonWrapper>
          <Button onClick={() => router.push("/products/add")}>Añadir</Button>
        </ButtonWrapper>
      ) : undefined}

      <ProductsGrid products={products} />
    </>
  );
};

export async function getServerSideProps() {
  const products = await performGET<Product[]>(URLS.products);

  return {
    props: { products },
  };
}

export default observer(Products);
