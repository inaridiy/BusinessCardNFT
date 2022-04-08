import {
  CardMeta,
  CardStandardMete,
  Poap,
  TicketMeta,
} from "@/types/cardMetaTypes";
import { Account } from "@/types/web3Types";
import { BigNumber, ethers } from "ethers";
import { QueryClient } from "react-query";
import invariant from "tiny-invariant";
import { getContract, signMessage } from ".";
import { contractList, contractTypes } from "./config";
import { NameCard } from "./contract";

export const fetchIpfs = async (ipfs: string) => {
  const res = await fetch(
    `https://cloudflare-ipfs.com/ipfs/${ipfs.replace("ipfs://", "")}`
  );
  const meta = convertStandardToMeta((await res.json()) as CardStandardMete);
  return meta;
};

export const getTokenUri = (type: contractTypes, id: BigNumber) => {
  const contract = getContract(contractList[type]);
  return contract.uri(id);
};

export const getCardImage = (meta: CardMeta) => {
  const searchParams = new URLSearchParams(Object.entries(meta));
  return `/api/ss?${searchParams.toString()}`;
};

export const getPoap = async (address: string) => {
  const res = await fetch(
    `https://api.poap.xyz/actions/scan/${String(address)}`
  );
  const json = (await res.json()) as Poap[] | unknown;
  const poaps = (Array.isArray(json) ? json : []) as Poap[];
  return poaps;
};

export const convertStandardToMeta = (standard: CardStandardMete): CardMeta => {
  const { attributes } = standard;
  const cardMeta = Object.fromEntries(
    attributes.map(({ trait_type, value }) => [trait_type, value])
  );
  return cardMeta as CardMeta;
};

export const convertToStandardMeta = (meta: CardMeta): CardStandardMete => {
  invariant(meta.address);
  const searchParams = new URLSearchParams(Object.entries(meta));
  return {
    image: `https://business-card-nft.vercel.app/api/ss?${searchParams.toString()}`,
    name: `${meta.name || "unknown"}'s Meishi`,
    description: meta.description || `${meta.name || "unknown"}'s Meishi`,
    external_url: `https://business-card-nft.vercel.app/meishi/${meta.address}`,
    attributes: Object.entries(meta).map(([key, value]) => ({
      trait_type: key,
      value: value ? String(value) : "",
    })),
  };
};

export const markdownToHtml = async (markdown: string) => {
  const markdownIt = (await import("markdown-it")).default;
  const md = markdownIt({ linkify: true });
  return md.render(markdown);
};

export const getTicket = async (
  type: string,
  provider?: ethers.providers.Web3Provider | null,
  account?: Account | null,
  contract?: NameCard | null,
  queryClient?: QueryClient | null
) => {
  invariant(provider && account && contract && queryClient);
  const signature =
    queryClient.getQueryData("ticket-signature") ||
    queryClient.setQueryData(
      "ticket-signature",
      await signMessage(provider.getSigner(), "ticket-sign")
    );
  const ticketStrings = await queryClient.fetchQuery(
    ["ticketStrings", type, account.id],
    () => contract.ownerTicket("ticket-sign", signature as string, account.id)
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
  return tickets;
};
