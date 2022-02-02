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
  margin: 4rem 0;

  @media (max-width: 415px) {
    margin: 2rem 0;
  }
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

  const checkPathnameValid = (pathname: string) => {
    const [empty, products, productId, ...rest] = pathname.split("/");

    if (rest.length !== 0) return false;
    if (empty !== "") return false;
    if (products !== "products") return false;
    if (Number.isNaN(+productId)) return false;

    return true;
  };

  const handleProcessResults = (result: string | null) => {
    if (result) {
      try {
        const urlFromResult = new URL(result);
        if (checkPathnameValid(urlFromResult.pathname)) {
          router.push(urlFromResult.pathname);
        } else {
          throw new Error("QR escaneado no es valido");
        }
      } catch (e) {
        setError((e as Error).toString());
      }
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
