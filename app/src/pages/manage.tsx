import Card from "@/components/card";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
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
        <div className="scale-75">
          <Card {...query.data} />
        </div>
      </div>
      <div className="relative card bg-base-100">
        <figure
          className="w-full aspect-card"
          onClick={() => setOpenView(true)}
        >
          {query.data && (
            <img src={getCardImage(query.data)} alt="card thumbnail" />
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

  return (
    <div className="flex justify-center mb-16 items-center h-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 m-3 gap-3">
        {queries.map((query, i) => (
          <CardDetail key={`card-${i}`} query={query} />
        ))}
      </div>
      <NextLink href="/print">
        <a className="btn btn-circle fixed right-4 bottom-20 shadow-lg">
          <AiOutlinePlus size="2rem" />
        </a>
      </NextLink>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};
