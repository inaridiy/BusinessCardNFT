import "@/assets/global.css";
import { DefaultLayout } from "@/components/Layout";
import { AppProvider } from "@/provider";
import "@inaridiy/useful-web3/dist/cjs/index.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  return (
    <AppProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AppProvider>
  );
}

export default MyApp;
