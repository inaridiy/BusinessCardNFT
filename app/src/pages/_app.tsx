import "@/styles/global.css";
import { DefaultSeo } from "next-seo";
import SEO from "@/seo.config";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
