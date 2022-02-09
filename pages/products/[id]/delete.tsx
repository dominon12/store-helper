import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import AdminComponentWrapper from "../../../components/AdminComponentWrapper";
import ApiResponseTemplate from "../../../components/ApiResponseTemplate";
import DeleteProductConfirmation from "../../../components/DeleteProductConfirmation";
import { URLS } from "../../../services/api-service";
import Requester, { RequestResult } from "../../../services/Requester";
import { Product } from "../../../types/api-types";

interface Props {
  product: RequestResult<Product>;
}

const DeleteProduct: NextPage<Props> = (props) => {
  const router = useRouter();
  const productId = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  return (
    <>
      <Head>
        <title>Eliminar producto</title>
      </Head>
      <AdminComponentWrapper>
        <ApiResponseTemplate
          render={() => (
            <>
              <DeleteProductConfirmation productId={productId} />
            </>
          )}
          error={props.product.error}
        />
      </AdminComponentWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const product = await Requester.get({
    url: URLS.products + context.query.id,
  });

  return {
    props: { product },
  };
};

export default DeleteProduct;
