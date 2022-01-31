import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AddProductForm from "../../components/ProductForm";

import PageHeader from "../../components/PageHeader";
import userStore from "../../store/userStore";

const AddProduct: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!userStore.isAuthenticated || !userStore.user?.isAdmin) {
      router.push("/login");
    }
  }, []);

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
