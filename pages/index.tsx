import { NextPage } from "next";
import Head from "next/head";

import PageHeader from "../components/PageHeader";
import QRScanner from "../components/QRScanner";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pagina inicial</title>
      </Head>

      <PageHeader title="Escanea el codigo del producto" />

      <QRScanner />
    </>
  );
};

export default Home;
