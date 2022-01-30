import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import PageTemplate from "../components/PageTemplate";
import Title from "../components/Title";
import userStore from "../store/userStore";

const Login: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (userStore.isAuthenticated) router.push("/products");
  }, []);

  return (
    <PageTemplate>
      <Head>
        <title>Autentificación</title>
      </Head>

      <Title centered>Autentificación</Title>
    </PageTemplate>
  );
};

export default observer(Login);
