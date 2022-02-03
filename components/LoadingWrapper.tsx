import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 75vh;
`;

const LoadingWrapper: FC = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <>
      {loading ? (
        <LoaderWrapper>
          <BallTriangle color="black" />
        </LoaderWrapper>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrapper;
