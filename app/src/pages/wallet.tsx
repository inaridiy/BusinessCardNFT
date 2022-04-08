import CardDetail from "@/components/card/CardDetail";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import { UsefulButton } from "@/components/UsefulBtn";
import { useWeb3 } from "@/hooks";
import { useHavingIds } from "@/hooks/fetcher";
import React from "react";

export default function Page() {
  const { data, isLoading, isFetched } = useHavingIds("astar");
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
    <div className="mb-24 container mx-auto max-w-screen-lg p-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data?.reverse().map((id) => (
          <CardDetail key={id.toString()} tokenId={id} />
        ))}
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};
