import { FC } from "react";
import Image from "next/image";
import styled from "styled-components";

import imageStub from "../public/no-photo-available.png";

const StyledImage = styled(Image)`
  height: 350px;
  width: 100%;
  object-fit: contain;
`;

interface Props {
  src?: string;
  alt?: string;
}

const ProductImage: FC<Props> = (props) => {
  const src = props.src ?? imageStub.src;
  const alt = props.alt ?? "No photo";

  return (
    <StyledImage
      loader={() => src}
      src={src}
      alt={alt}
      height={350}
      width={430}
    />
  );
};

export default ProductImage;
