import { IProviderOptions } from "web3modal";

export const defaultChains = {
  polygon: {
    chainId: "0x89",
    blockExplorerUrls: ["https://polygonscan.com/"],
    chainName: "Polygon Mainnet",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://matic-mainnet.chainstacklabs.com"],
  },
  mubai: {
    chainId: "0x13881",
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    chainName: "Matic Mumbai",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  },
  shibuya: {
    chainId: "0x51",
    blockExplorerUrls: ["https://shibuya.subscan.io"],
    chainName: "Shibuya Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "SBY",
      symbol: "SBY",
    },
    rpcUrls: ["https://rpc.shibuya.astar.network:8545"],
  },
  astar: {
    chainId: "0x250",
    blockExplorerUrls: ["https://astar.subscan.io"],
    chainName: "Astar Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "ASTR",
      symbol: "ASTR",
    },
    rpcUrls: ["https://rpc.astar.network:8545"],
  },
  shiden: {
    chainId: "0x150",
    blockExplorerUrls: ["https://blockscout.com/shiden/"],
    chainName: "Shiden Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "SDN",
      symbol: "SDN",
    },
    rpcUrls: ["https://evm.shiden.astar.network"],
  },
};

export type Chains = keyof typeof defaultChains;

export const getDefaultProviderOptions =
  async (): Promise<IProviderOptions> => ({
    walletconnect: {
      package: (await import("@walletconnect/web3-provider")).default,
      options: {
        rpc: {
          1: `https://mainnet.infura.io/v3/${
            process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || ""
          }`,
        },
      },
    },
  });
