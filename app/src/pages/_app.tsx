import { Web3Provider } from "@/components/Web3Provider";
import SEO from "@/seo.config";
import "@/styles/global.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Web3Provider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Web3Provider>
    </ThemeProvider>
  );
}

export default MyApp;
