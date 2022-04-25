import "@/assets/global.css";
import { DefaultLayout } from "@/components/Layout";
import { UsefulToast, Web3Provider } from "@inaridiy/useful-web3";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  useEffect(() => {
    if (typeof window === "object") {
      void persistQueryClient({
        queryClient,
        persistor: createWebStoragePersistor({
          storage: window.localStorage,
        }),
      });
    }
  }, []);
  return (
    <Web3Provider>
      <QueryClientProvider client={queryClient}>
        <UsefulToast />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </QueryClientProvider>
    </Web3Provider>
  );
}

export default MyApp;
