import { observer } from "mobx-react";
import { FC, useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

import userStore from "../store/userStore";
import MenuLink from "./MenuLink";

const AuthIcon: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    userStore.isAuthenticated
  );

  return isAuthenticated ? (
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
