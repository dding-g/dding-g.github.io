import "../styles/globals.css";
import type { AppProps } from "next/app";
import { globalStyles } from "../styles/globalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
