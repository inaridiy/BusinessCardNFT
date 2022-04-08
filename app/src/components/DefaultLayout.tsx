import { Web3Provider } from "@/components/Web3Provider";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
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
    <div className="min-h-full bg-base-200 text-base-content flex flex-col transition-all pb-16 sm:pb-0 pt-0 sm:pt-32">
      <PcHeader />
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

export const LinkIcon: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  const router = useRouter();

  return (
    <div
      className={`h-full flex items-center border-neutral ${
        router.route === href ? "border-b-4" : ""
      }`}
    >
      <NextLink href={href}>
        <a className="btn btn-ghost">{children}</a>
      </NextLink>
    </div>
  );
};

export const LinkText: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  const router = useRouter();

  return (
    <div
      className={`h-full flex items-center border-neutral ${
        router.route === href ? "border-b-4" : ""
      }`}
    >
      <NextLink href={href}>
        <a className="text-lg btn btn-ghost">{children}</a>
      </NextLink>
    </div>
  );
};

export const PcHeader: React.FC<{ children?: React.ReactNode }> = () => {
  return (
    <nav className="bg-base-100 h-16 fixed hidden sm:navbar z-20 top-0">
      <div className="navbar-start">
        <NextLink href="/">
          <a className="btn btn-ghost normal-case text-xl">NFT Meishi</a>
        </NextLink>
      </div>
      <div className="navbar-end">
        <LinkText href="/manage">Manage</LinkText>
        <LinkText href="/wallet">Wallet</LinkText>
        <LinkText href="/print">Print</LinkText>
      </div>
    </nav>
  );
};

export const MobileBar: React.FC<{ children?: React.ReactNode }> = () => {
  return (
    <nav className="bg-base-100 h-16 fixed w-full bottom-0 flex items-center justify-center sm:hidden z-20">
      <LinkIcon href="/">
        <AiOutlineHome size="2rem" />
      </LinkIcon>
      <LinkIcon href="/manage">
        <BsPencil size="2rem" />
      </LinkIcon>
      <LinkIcon href="/wallet">
        <AiOutlineWallet size="2rem" />
      </LinkIcon>
      <LinkIcon href="/scan">
        <AiOutlineScan size="2rem" />
      </LinkIcon>
    </nav>
  );
};
