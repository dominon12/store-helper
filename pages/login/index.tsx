import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LoginForm from "../../components/LoginForm";
import PageHeader from "../../components/PageHeader";
import userStore from "../../store/userStore";

const LoginPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (userStore.isAuthenticated) router.push("/products");
  }, []);

  return (
    <>
      <Head>
        <title>Autenticación</title>
      </Head>

      <PageHeader title="Autenticación" />

      <LoginForm />
    </>
  );
};

export default observer(LoginPage);
