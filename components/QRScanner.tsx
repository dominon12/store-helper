import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import ErrorData from "./ErrorData";

const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;

const ErrorWrapper = styled(ErrorData)`
  width: 300px;
`;

const previewStyle = {
  width: 300,
  height: 300,
  display: "flex",
  justifyContent: "center",
};

const QRScanner: FC = () => {
  const router = useRouter();

  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcessResults = (result: string | null) => {
    if (result) {
      const productId = parseInt(result);

      if (productId) router.push(`/products/${productId}`);
      else setError("QR escaneado no es valido");
    }
  };

  useEffect(() => {
    handleProcessResults(scanResult);
  }, [scanResult]);

  return (
    <Wrapper>
      <QrReader
        delay={300}
        onScan={setScanResult}
        onError={setError}
        style={previewStyle}
      />
      <ErrorWrapper errorMessage={error} />
    </Wrapper>
  );
};

export default QRScanner;
