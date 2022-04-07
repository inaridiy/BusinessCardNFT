import { Web3Provider } from "@/components/Web3Provider";
import NextLink from "next/link";
import { useEffect } from "react";
import { AiOutlineHome, AiOutlineScan, AiOutlineWallet } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const DefaultProvider: React.FC<{ children: React.ReactNode }> = ({
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
    <QueryClientProvider client={queryClient}>
      <Web3Provider>{children}</Web3Provider>
    </QueryClientProvider>
  );
};

const DefaultLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-full bg-base-200 text-base-content flex flex-col transition-all">
      {children}
      <MobileBar />
    </div>
  );
};

const DefaultLayoutWithProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DefaultProvider>
      <DefaultLayout>{children}</DefaultLayout>
    </DefaultProvider>
  );
};

export default DefaultLayoutWithProvider;

export const Header: React.FC = () => {
  return (
    <nav className="navbar fixed justify-center bg-base-100 h-16">
      <NextLink href="/">
        <a className="btn btn-ghost text-2xl normal-case">NFMeishi</a>
      </NextLink>
    </nav>
  );
};

export const MobileBar: React.FC<{ children?: React.ReactNode }> = () => {
  return (
    <nav className="navbar bg-base-100 h-16 fixed w-full bottom-0 justify-center sm:hidden">
      <NextLink href="/">
        <a className="btn btn-ghost flex flex-col">
          <AiOutlineHome size="2rem" />
        </a>
      </NextLink>
      <NextLink href="/manage">
        <a className="btn btn-ghost flex-col">
          <BsPencil size="2rem" />
        </a>
      </NextLink>
      <a className="btn btn-ghost flex-col">
        <AiOutlineWallet size="2rem" />
      </a>
      <a className="btn btn-ghost flex-col">
        <AiOutlineScan size="2rem" />
      </a>
    </nav>
  );
};
