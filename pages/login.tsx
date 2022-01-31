import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LoginForm from "../components/LoginForm";
import PageHeader from "../components/PageHeader";
import userStore from "../store/userStore";

const Login: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (userStore.isAuthenticated) router.push("/products");
  }, []);

  return (
    <>
      <Head>
        <title>Autentificación</title>
      </Head>

      <PageHeader title="Autentificación" />

      <LoginForm />
    </>
  );
};

export default observer(Login);
