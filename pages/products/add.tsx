import { NextPage } from "next";
import Head from "next/head";

import AddProductForm from "../../components/ProductForm";
import PageHeader from "../../components/PageHeader";
import AdminComponentWrapper from "../../components/AdminComponentWrapper";

const AddProduct: NextPage = () => {
  return (
    <>
      <Head>
        <title>Añadir producto</title>
      </Head>

      <AdminComponentWrapper>
        <PageHeader title="Añadir producto" />
        <AddProductForm />
      </AdminComponentWrapper>
    </>
  );
};

export default AddProduct;
