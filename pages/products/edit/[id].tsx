import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import ApiResponseTemplate from "../../../components/ApiResponseTemplate";
import PageHeader from "../../../components/PageHeader";
import ProductForm from "../../../components/ProductForm";
import { performGET, URLS } from "../../../services/api-service";
import { Product } from "../../../types/api-types";
import { RequestResult } from "../../../types/system-types";

interface Props {
  product: RequestResult<Product>;
}

const EditProduct: NextPage<Props> = ({ product }) => {
  return (
    <>
      <Head>
        <title>
          {product.data && !product.error && product.data.name + " | "} Pagina
          del producto
        </title>
      </Head>

      <ApiResponseTemplate
        render={() => {
          return (
            <>
              <PageHeader title="Editar producto" />
              <ProductForm product={product.data as Product} />
            </>
          );
        }}
        error={product.error}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const product = await performGET(URLS.products + context.query.id);

  return {
    props: { product },
  };
};

export default EditProduct;
