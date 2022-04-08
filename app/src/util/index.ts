import { contractList } from "@/util/config";
import { NameCard__factory } from "@/util/contract";
import { ethers } from "ethers";
import { arrayify, keccak256, toUtf8Bytes } from "ethers/lib/utils";
type valueOf<T> = T[keyof T];

export const stopPropagation = (e: React.MouseEvent<HTMLElement>) =>
  e.stopPropagation();

export const inputHandler =
  (cb: (v: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    cb(e.target.value);

export const closeModal = (e: React.MouseEvent<HTMLElement>) => {
  window.location.href = "#";
  e.stopPropagation();
};

export const signMessage = (singer: ethers.Signer, message: string) =>
  singer.signMessage(arrayify(keccak256(toUtf8Bytes(message))));

export const getContract = (
  type: valueOf<typeof contractList>,
  provider?: ethers.providers.Provider | ethers.Signer
) =>
  NameCard__factory.connect(
    type.address,
    provider || new ethers.providers.JsonRpcProvider(type.rpc)
  );

export const usefulGsnFunc = async (
  singer: ethers.Signer,
  func: string,
  arg: any[] // eslint-disable-line
) => {
  const json = JSON.stringify(arg);
  await fetch("/api/transaction", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: await singer.getAddress(),
      argument: json,
      func,
      signature: await singer.signMessage(json),
    }),
  });
};
