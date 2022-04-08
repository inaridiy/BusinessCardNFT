import { getContract } from "@/util";
import { contractList, contractTypes } from "@/util/config";
import { NameCard } from "@/util/contract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

type option = Partial<{
  fetchOnly: boolean;
  fallback: boolean;
  cb?: (
    contract: NameCard,
    provider: ethers.providers.Provider
  ) => void | Promise<void>;
}>;

type useContract = (
  type: keyof typeof contractList,
  opt?: option
) => NameCard | null;

export const useContract: useContract = (
  type,
  { fetchOnly, fallback, cb } = {}
) => {
  const contractType = contractList[type];
  const { provider, chainId } = useWeb3();
  const [contract, setContract] = useState<null | NameCard>(
    fetchOnly ? getContract(contractType) : null
  );
  const isTargetChain = Number(contractType.chainId) === Number(chainId);

  useEffect(() => {
    if (fetchOnly) {
      setContract(getContract(contractType));
    } else if (fallback && !(provider && isTargetChain)) {
      setContract(getContract(contractType));
    } else if (provider && isTargetChain) {
      setContract(getContract(contractType, provider.getSigner()));
    } else {
      setContract(null);
    }
  }, [provider, chainId, fetchOnly, fallback]);

  useEffect(() => {
    if (contract) {
      cb &&
        void cb(
          contract,
          new ethers.providers.JsonRpcProvider(contractType.rpc)
        );
    }
  }, [contract]);

  return contract;
};

export const useJsonProvider = (type: contractTypes) =>
  new ethers.providers.JsonRpcBatchProvider(contractList[type].rpc);
