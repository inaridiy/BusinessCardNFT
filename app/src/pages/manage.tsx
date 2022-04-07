import Card from "@/components/card";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import { UsefulButton } from "@/components/UsefulBtn";
import { useWeb3 } from "@/hooks";
import { useCreatorNFTs } from "@/hooks/fetcher";
import { CardMeta } from "@/types/cardMetaTypes";
import { getCardImage } from "@/util/cardUtil";
import NextLink from "next/link";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { UseQueryResult } from "react-query";

const CardDetail: React.FC<{ query: UseQueryResult<CardMeta, unknown> }> = ({
  query,
}) => {
  const [openView, setOpenView] = useState(false);
  return (
    <>
      <div
        className={`modal ${openView ? "modal-open" : ""}`}
        onClick={() => setOpenView(false)}
      >
        <div className="scale-75 sm:scale-125">
          <Card {...query.data} />
        </div>
      </div>
      <div className="relative card bg-base-100 shadow">
        <figure
          className="w-full aspect-card bg-base-300"
          onClick={() => setOpenView(true)}
        >
          <span className="btn btn-ghost loading absolute z-10" />
          {query.data && (
            <img
              src={getCardImage(query.data)}
              alt="card thumbnail"
              className="z-10"
            />
          )}
        </figure>

        <div className="flex">
          <button className="btn btn-secondary rounded-none grow">
            Ticket
          </button>
          <button className="btn btn-primary rounded-none grow">Other</button>
        </div>
      </div>
    </>
  );
};

export default function Page() {
  const queries = useCreatorNFTs("astar");
  const { account } = useWeb3();
  console.log(account);
  if (queries.isLoading) {
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
      <div className="grid grid-cols-2 sm:grid-cols-4 m-3 gap-3 mb-24">
        {queries.data.map((query, i) => (
          <CardDetail key={`card-${i}`} query={query} />
        ))}
      </div>
      <NextLink href="/print">
        <a className="btn btn-circle fixed right-4 bottom-20 shadow-lg">
          <AiOutlinePlus size="2rem" />
        </a>
      </NextLink>
    </>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};
