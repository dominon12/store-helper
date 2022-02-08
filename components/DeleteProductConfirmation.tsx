import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import Title from "./Title";
import ProductService from "../services/ProductService";
import userStore from "../store/userStore";

const Wrapper = styled.section`
  height: 60vh;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin-top: 1.5rem;

  @media (max-width: 388px) {
    width: 150px;
  }
`;

interface Props {
  productId?: string;
}

const DeleteProductConfirmation: FC<Props> = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancellation = () => {
    router.push(`/products/${props.productId}`);
  };

  if (!props.productId) {
    return (
      <Wrapper>
        <Title centered>El producto solicitado no existe</Title>
        <ButtonsWrapper>
          <Button onClick={handleCancellation}>Volver</Button>
        </ButtonsWrapper>
      </Wrapper>
    );
  }


  const handleConfirmation = () => {
    if (props.productId) {
      ProductService.delete({
        productId: props.productId,
        router,
        setIsLoading,
        authToken: userStore.authToken,
      });
    }
  };

  return (
    <Wrapper>
      <Title centered>
        Estás seguro de que quieres eliminar este producto?
      </Title>
      <ButtonsWrapper>
        <Button onClick={handleCancellation}>No</Button>
        <Button onClick={handleConfirmation} loading={isLoading}>
          Sí
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default observer(DeleteProductConfirmation);
