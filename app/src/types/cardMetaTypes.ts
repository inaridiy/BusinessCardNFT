export interface Media {
  github?: string;
  twitter?: string;
  cyberConnect?: string;
}

export interface Poap {
  event: Event;
  tokenId: string;
  owner: string;
  chain: string;
  created: Date;
}

export interface CardMeta {
  address?: string;
  name?: string;
  icon?: string;
  description?: string;
  media?: Media;
}

export interface Event {
  id: number;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  supply: number;
}
