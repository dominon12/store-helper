import { observer } from "mobx-react-lite";
import { FC } from "react";
import styled from "styled-components";

import Title from "./Title";
import useAdminCheck from "../hooks/useAdminCheck";
import userStore from "../store/userStore";

const LoaderWrapper = styled.section`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdminComponentWrapper: FC = (props) => {
  const checking = useAdminCheck(userStore.user);

  if (checking) {
    return (
      <LoaderWrapper>
        <Title>Comprobando permisos...</Title>
      </LoaderWrapper>
    );
  }

  return <>{props.children}</>;
};

export default observer(AdminComponentWrapper);
