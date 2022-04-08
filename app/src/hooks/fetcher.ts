import { TicketMeta } from "@/types/cardMetaTypes";
import { signMessage } from "@/util";
import { fetchIpfs, getTokenUri } from "@/util/cardUtil";
import { contractTypes } from "@/util/config";
import { NameCard } from "@/util/contract";
import { BigNumber, BigNumberish } from "ethers";
import { useState } from "react";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { useContract } from "./useContract";
import { useWeb3 } from "./useWeb3";

export const useTickets = (type: contractTypes) => {
  const { account, provider } = useWeb3();
  const [error, setError] = useState("");
  const { data: tickets } = useQuery(["tickets", type, account?.id], {
    enabled: false,
    initialData: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const contract = useContract(type, { fetchOnly: true });
  const getTicket = async () => {
    try {
      if (provider && account && contract) {
        setIsLoading(true);
        const signature =
          queryClient.getQueryData("ticket-signature") ||
          queryClient.setQueryData(
            "ticket-signature",
            await signMessage(provider?.getSigner(), "ticket-sign")
          );
        const ticketStrings = await queryClient.fetchQuery(
          ["ticketStrings", type, account.id],
          () =>
            contract.ownerTicket("ticket-sign", signature as string, account.id)
        );
        const tickets = (
          await Promise.all(
            ticketStrings.map((ticketString) =>
              queryClient.fetchQuery(["ticket", type, ticketString], () =>
                contract.ticket(ticketString)
              )
            )
          )
        ).map((data, i) => ({
          ticket: ticketStrings[i],
          ...data,
        })) as TicketMeta[];

        queryClient.setQueryData(["tickets", type, account.id], tickets);
      }
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ? String(err.message) : String(e));
    } finally {
      setIsLoading(false);
    }
  };
  return {
    getTicket,
    isLoading,
    error,
    tickets: tickets?.map(
      ({ amount, effectiveAt, infinite, tokenId, ticket }, i) => ({
        ticket,
        amount: BigNumber.from(amount),
        effectiveAt: BigNumber.from(effectiveAt),
        infinite,
        tokenId: BigNumber.from(tokenId),
      })
    ) as TicketMeta[],
  };
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
