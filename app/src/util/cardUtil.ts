import { Poap } from "@/types/cardMetaTypes";

export const getPoap = async (address: string) => {
  const res = await fetch(
    `https://api.poap.xyz/actions/scan/${String(address)}`
  );
  const json = (await res.json()) as Poap[] | unknown;
  const poaps = (Array.isArray(json) ? json : []) as Poap[];
  return poaps;
};
