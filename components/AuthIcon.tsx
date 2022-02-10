import { observer } from "mobx-react";
import { FC } from "react";
import { FaLock } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

import userStore from "../store/userStore";
import MenuLink from "./MenuLink";

const AuthIcon: FC = () => {
  return userStore.isAuthenticated ? (
    <MenuLink
      label="Log Out"
      href="/logout"
      Icon={MdExitToApp}
      withLeftMargin
    />
  ) : (
    <MenuLink label="Log In" href="/login" Icon={FaLock} withLeftMargin />
  );
};

export default observer(AuthIcon);
