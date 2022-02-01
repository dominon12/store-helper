import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import Head from "next/head";

import AddProductForm from "../../components/ProductForm";
import PageHeader from "../../components/PageHeader";
import userStore from "../../store/userStore";
import useAdminCheck from "../../hooks/useAdminCheck";

const AddProduct: NextPage = () => {
  useAdminCheck(userStore.user);

  return (
    <>
      <Head>
        <title>Añadir producto</title>
      </Head>

      <PageHeader title="Añadir producto" />

      <AddProductForm />
    </>
  );
};

export default observer(AddProduct);
