import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import { useCreatorNFTs } from "@/hooks/fetcher";
import { CardMeta } from "@/types/cardMetaTypes";
import NextLink from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function Page() {
  const queries = useCreatorNFTs("astar");

  const getCardImage = (meta: CardMeta) => {
    const searchParams = new URLSearchParams(Object.entries(meta));
    return `/api/ss?${searchParams.toString()}`;
  };
  return (
    <div className="flex justify-center mb-16 items-center h-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 m-3 gap-3">
        {[...queries].map((query, i) => (
          <div key={`card-${i}`} className="relative card bg-base-100">
            {query.data && (
              <figure className="w-full aspect-card">
                <img src={getCardImage(query.data)} alt="card thumbnail" />
              </figure>
            )}

            <div className="flex">
              <button className="btn btn-secondary rounded-none grow">
                Ticket
              </button>
              <button className="btn btn-primary rounded-none grow">
                Info
              </button>
            </div>
          </div>
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
