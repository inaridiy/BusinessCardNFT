import { Account } from "@/types/web3Types";
import { fetchIpfs } from "@/util/cardUtil";
import { NameCard } from "@/util/contract";
import { useQueries, useQuery } from "react-query";

export const useNFTs = () => {};

export const useFetchUris = (contract?: NameCard, account?: Account) => {
  const { data } = useQuery(
    ["cards", account?.id],
    () => (contract as NameCard).havingURI(account?.id as string),
    { enabled: Boolean(account && contract), refetchOnWindowFocus: false }
  );
  return data;
};

export const useFetchNFTs = (uris: string[]) => {
  const queries = useQueries(
    uris.map((uri) => ({
      queryKey: ["nftdata", uri],
      queryFn: () => fetchIpfs(uri),
      enabled: Boolean(uri),
    }))
  );
  return queries;
};
