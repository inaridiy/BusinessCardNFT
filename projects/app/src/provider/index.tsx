import { ShareModal } from "@/components/Modal/compoents/ShareModal";
import { UsefulToast, Web3Provider } from "@inaridiy/useful-web3";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const AppProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
    <RecoilRoot>
      <Web3Provider>
        <QueryClientProvider client={queryClient}>
          <ShareModal />
          <UsefulToast />
          {children}
        </QueryClientProvider>
      </Web3Provider>
    </RecoilRoot>
  );
};
