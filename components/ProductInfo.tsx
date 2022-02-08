import Image from "next/image";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";
import { useRouter } from "next/router";

import Label from "./Label";
import Paragraph from "./Paragraph";
import ProductAdminButtons from "./ProductAdminButtons";
import Title from "./Title";
import { Product } from "../types/api-types";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 75vh;
`;

const Content = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 722px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled(Image)`
  width: 50%;
  height: 100%;
  object-fit: contain;

  @media (max-width: 722px) {
    width: 80%;
  }
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const QRCodeWrapper = styled.div`
  margin-top: 1rem;
`;

const ProductData = styled.section`
  padding: 0 1.5rem;
  width: 50%;

  @media (max-width: 722px) {
    order: -1;
    margin-bottom: 2rem;
    width: 80%;
  }

  @media (max-width: 425px) {
    margin-top: 2rem;
    width: 100%;
  }
`;

const Description = styled(Paragraph)`
  margin: 2rem 0;
`;

interface Props {
  product: Product;
}

const ProductInfo: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [pageHref, setPageHref] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageHref(window.location.href);
    }
  }, [router.pathname]);

  return (
    <Wrapper>
      <Content>
        <ImageWrapper>
          <ProductImage
            src={product.image}
            loader={() => product.image}
            alt={product.name}
            height={450}
            width={450}
          />
          <QRCodeWrapper>
            <QRCode value={pageHref} />
          </QRCodeWrapper>
        </ImageWrapper>

        <ProductData>
          <Title>{product.name}</Title>
          <Description>{product.description}</Description>
          <Label>{product.price} €</Label>
          <ProductAdminButtons productId={product._id} />
        </ProductData>
      </Content>
    </Wrapper>
  );
};

export default ProductInfo;
