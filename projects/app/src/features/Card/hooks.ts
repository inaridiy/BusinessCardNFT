import { useQuery } from "react-query";
import { Poap } from "./types";

export const usePoaps = (address?: string) =>
  useQuery(["poaps", address], () => getPoaps(address as string), {
    enabled: Boolean(address),
    refetchOnWindowFocus: false,
  });

export const getPoaps = async (address: string) => {
  const res = await fetch(
    `https://api.poap.xyz/actions/scan/${String(address)}`
  );
  const json = (await res.json()) as Poap[] | unknown;
  const poaps = (Array.isArray(json) ? json : []) as Poap[];
  return poaps;
};
