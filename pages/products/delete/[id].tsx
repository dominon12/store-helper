import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import Head from "next/head";
import useAdminCheck from "../../../hooks/useAdminCheck";
import userStore from "../../../store/userStore";

const DeleteProduct: NextPage = (props) => {
  useAdminCheck(userStore.user);

  return (
    <>
      <Head>
        <title>Eliminar producto</title>
      </Head>
    </>
  );
};

export default observer(DeleteProduct);
