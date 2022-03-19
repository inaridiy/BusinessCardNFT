import SEO from "@/seo.config";
import "@/styles/global.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
