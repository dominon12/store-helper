import { AppProps } from "next/app";
import PageTemplate from "../components/PageTemplate";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  );
}

export default MyApp;
