import { CardMeta, CardStandardMete, Poap } from "@/types/cardMetaTypes";
import { BigNumber } from "ethers";
import invariant from "tiny-invariant";
import { getContract } from ".";
import { contractList, contractTypes } from "./config";

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
    animation_url: `https://business-card-nft.vercel.app/card?${searchParams.toString()}`,
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
