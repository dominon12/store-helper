import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import ApiResponseTemplate from "../../../components/ApiResponseTemplate";
import ProductInfo from "../../../components/ProductInfo";
import { URLS } from "../../../services/api-service";
import Requester, { RequestResult } from "../../../services/Requester";
import { Product as IProduct } from "../../../types/api-types";

interface Props {
  product: RequestResult<IProduct>;
}

const Product: NextPage<Props> = ({ product }) => {
  return (
    <>
      <Head>
        <title>
          {product.data && !product.error && product.data.name + " | "} Pagina
          del producto
        </title>
      </Head>

      <ApiResponseTemplate
        render={() => <ProductInfo product={product.data as IProduct} />}
        error={product.error}
      />
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

export default Product;
