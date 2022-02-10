import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import userStore from "../../store/userStore";

const LogoutPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    userStore.logout();
    router.push("/products");
  }, []);

  return null;
};

export default observer(LogoutPage);
