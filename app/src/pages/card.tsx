import Card from "@/components/card";
import { CardMeta } from "@/types/cardMetaTypes";
import { getCardImage } from "@/util/cardUtil";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Page() {
  const { query } = useRouter() as { query: CardMeta };
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NextSeo
        title={`${query.name || "unknown"}'s Meishi`}
        openGraph={{
          images: [
            {
              url: `https://business-card-nft.vercel.app/${getCardImage(
                query
              )}`,
            },
          ],
        }}
      />
      <div
        className={`flex justify-center items-center h-full bg-base-300`}
        data-theme={query.theme || "light"}
      >
        <Card {...query} />
      </div>
    </QueryClientProvider>
  );
}
