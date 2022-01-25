import Head from "next/head";
import { NextPage } from "next";

import PageTemplate from "../components/PageTemplate";
import Title from "../components/Title";

const Products: NextPage = () => {
  return (
    <PageTemplate>
      <Head>
        <title>Lista de Productos</title>
      </Head>

      <Title>Hola q tal</Title>
    </PageTemplate>
  );
};

export default Products;
