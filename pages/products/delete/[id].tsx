import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import AdminComponentWrapper from "../../../components/AdminComponentWrapper";
import DeleteProductConfirmation from "../../../components/DeleteProductConfirmation";

const DeleteProduct: NextPage = (props) => {
  const router = useRouter();
  const productId = router.query.id ? +router.query.id : undefined;

  return (
    <>
      <Head>
        <title>Eliminar producto</title>
      </Head>
      <AdminComponentWrapper>
        <DeleteProductConfirmation productId={productId} />
      </AdminComponentWrapper>
    </>
  );
};

export default DeleteProduct;