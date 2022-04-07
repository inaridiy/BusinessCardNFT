import { Account } from "@/types/web3Types";
import { fetchIpfs } from "@/util/cardUtil";
import { contractTypes } from "@/util/config";
import { NameCard } from "@/util/contract";
import { useQueries, useQuery } from "react-query";
import { useContract } from "./useContract";
import { useWeb3 } from "./useWeb3";

export const useCreatorNFTs = (type: contractTypes) => {
  const { account, isLoading } = useWeb3();
  const contract = useContract(type, { fetchOnly: true });
  const query = useFetchCreatorUris(contract, account);
  const metaList = useFetchNFTs(query.data || []);

  return { data: metaList, isLoading: isLoading || query.isLoading };
};

export const useFetchUris = (
  contract?: NameCard | null,
  account?: Account | null
) => {
  const query = useQuery(
    ["cards", account?.id],
    () => (contract as NameCard).havingURI(account?.id as string),
    { enabled: Boolean(account && contract), refetchOnWindowFocus: false }
  );
  return query;
};
export const useFetchCreatorUris = (
  contract?: NameCard | null,
  account?: Account | null
) => {
  const query = useQuery(
    ["cards", account?.id],
    () => (contract as NameCard).createrURI(account?.id as string),
    { enabled: Boolean(account && contract), refetchOnWindowFocus: false }
  );
  return query;
};

export const useFetchNFTs = (uris: string[]) => {
  const queries = useQueries(
    uris.map((uri) => ({
      queryKey: ["nftdata", uri],
      queryFn: () => fetchIpfs(uri),
      enabled: Boolean(uri),
      refetchOnWindowFocus: false,
    }))
  );
  return queries;
};
