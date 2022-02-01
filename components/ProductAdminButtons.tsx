import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import styled from "styled-components";

import Button from "./Button";
import userStore from "../store/userStore";

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`;

const AdminButton = styled(Button)`
  margin-right: 1.5rem;
`;

interface Props {
  productId: number;
}

const ProductAdminButtons: FC<Props> = (props) => {
  const router = useRouter();

  if (userStore.isAuthenticated && userStore.user?.isAdmin) {
    const editAction = () => {
      router.push(`/products/edit/${props.productId}`);
    };

    const deleteAction = () => {
      router.push(`/products/delete/${props.productId}`);
    };

    return (
      <ButtonsWrapper>
        <AdminButton onClick={editAction}>Editar</AdminButton>
        <AdminButton onClick={deleteAction}>Eliminar</AdminButton>
      </ButtonsWrapper>
    );
  }

  return null;
};

export default observer(ProductAdminButtons);
