import { BusinessCard, BusinessCard__factory } from "@/util/contract";
import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

export const useContract = () => {
  const [contract, setContract] = useState<BusinessCard | null>(null);
  const { provider, isTargetChain } = useWeb3();

  useEffect(() => {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (provider && contractAddress && isTargetChain) {
      const signer = provider.getSigner();
      const ArticlesContract = BusinessCard__factory.connect(
        contractAddress,
        signer
      );
      setContract(ArticlesContract);
    } else {
      setContract(null);
    }
  }, [provider, isTargetChain]);

  return contract;
};
