import { CardMeta, CardStandardMete, Poap } from "@/types/cardMetaTypes";
import invariant from "tiny-invariant";

export const getPoap = async (address: string) => {
  console.log(address);
  const res = await fetch(
    `https://api.poap.xyz/actions/scan/${String(address)}`
  );
  const json = (await res.json()) as Poap[] | unknown;
  const poaps = (Array.isArray(json) ? json : []) as Poap[];
  return poaps;
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
