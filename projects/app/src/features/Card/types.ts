export interface Poap {
  event: Event;
  tokenId: string;
  owner: string;
  chain: string;
  created: Date;
}

export interface CardMeta {
  address: string;
  theme?: string;
}
