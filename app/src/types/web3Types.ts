import { Chains, defaultChains } from "@/util/config";
import { ethers } from "ethers";

type providerEvents = {
  accountsChanged: (ids: string[]) => void;
  chainChanged: (chainId: string) => void;
  disconnect: () => void;
};

export interface Web3ProviderInterface
  extends ethers.providers.ExternalProvider {
  isMetaMask: boolean;
  on: <T extends keyof providerEvents>(
    event: T,
    callback: providerEvents[T]
  ) => void;
}

export type ChainParameters = Record<string, ChainParameter>;

export interface ChainParameter {
  chainId: string;
  blockExplorerUrls: string[];
  chainName: string;
  iconUrls: string[];
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  rpcUrls: string[];
}

export interface Account {
  id: string;
  abbreviatedId: string;
  ethName: string | null;
  avatar: string | null;
}
export interface Web3ContextInterface {
  provider: ethers.providers.Web3Provider | null;
  account: Account | null;
  chainId: string | null;
  isMetaMask: boolean;
  isLoading: boolean;
  chains: typeof defaultChains;
  connectWallet: () => Promise<void>;
  switchChain: (chain: Chains) => Promise<void>;
}
