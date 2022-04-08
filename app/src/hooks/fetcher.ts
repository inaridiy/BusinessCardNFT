import { signMessage } from "@/util";
import { fetchIpfs, getTokenUri } from "@/util/cardUtil";
import { contractTypes } from "@/util/config";
import { NameCard } from "@/util/contract";
import { BigNumber, BigNumberish } from "ethers";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { useContract } from "./useContract";
import { useWeb3 } from "./useWeb3";

export const useTickets = (type: contractTypes) => {
  const { account, isLoading, provider } = useWeb3();
  const queryClient = useQueryClient();
  const contract = useContract(type, { fetchOnly: true });
  const getTicket = async () => {
    if (provider) {
      const signature =
        queryClient.getQueryData("ticket-signature") ||
        queryClient.setQueryData(
          "ticket-signature",
          await signMessage(provider?.getSigner(), "ticket-sign")
        );
      console.log(signature);
    }
  };
  return { getTicket };
};

export const useCreatorIds = (type: contractTypes) => {
  const { account, isLoading } = useWeb3();
  const contract = useContract(type, { fetchOnly: true });
  const query = useQuery(
    ["cards", type, account?.id],
    () => (contract as NameCard).createrIds(account?.id as string),
    { enabled: Boolean(account && contract), refetchOnWindowFocus: false }
  );

  return {
    ...query,
    data: query.data?.map((v) => BigNumber.from(v)),
    isLoading: isLoading || query.isLoading,
  } as UseQueryResult<BigNumber[], never>;
};

export const useCardBalance = (type: contractTypes, id?: BigNumberish) => {
  const { account, isLoading } = useWeb3();
  const contract = useContract(type, { fetchOnly: true });
  const query = useQuery(
    ["balance", type, id?.toString, account?.id],
    () =>
      (contract as NameCard).balanceOf(
        account?.id as string,
        id as BigNumberish
      ),
    { enabled: Boolean(account && contract && id), refetchOnWindowFocus: false }
  );
  return {
    ...query,
    isLoading: isLoading || query.isLoading,
  } as UseQueryResult<BigNumber, never>;
};

export const useFetchMeta = (type: contractTypes, id?: BigNumber) => {
  const query = useQuery(
    ["nftdata", id?.toString()],
    async () => await fetchIpfs(await getTokenUri(type, id as BigNumber)),
    {
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
    }
  );
  return query;
};
