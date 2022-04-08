import CardAdminDetail from "@/components/card/CardAdminDetail";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import { UsefulButton } from "@/components/UsefulBtn";
import { useWeb3 } from "@/hooks";
import { useCreatorIds } from "@/hooks/fetcher";
import NextLink from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Page() {
  const { data, isLoading, isFetched } = useCreatorIds("astar");
  const { account } = useWeb3();
  if (isLoading) {
    return (
      <div className="grow flex justify-center items-center">
        <span className="loading btn btn-ghost" />
      </div>
    );
  }
  if (!account) {
    return (
      <div className="grow flex justify-center items-center">
        <UsefulButton />
      </div>
    );
  }

  return (
    <>
      <div className="mb-24 container mx-auto max-w-screen-lg p-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data?.map((id) => (
            <CardAdminDetail key={id.toString()} tokenId={id} />
          ))}
        </div>
      </div>
      <NextLink href="/print">
        <a className="btn btn-circle fixed right-4 bottom-20 shadow-lg z-20">
          <AiOutlinePlus size="2rem" />
        </a>
      </NextLink>
    </>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};
