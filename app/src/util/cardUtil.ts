import { CardMeta } from "@/types/cardMeta";

export const cardMetaToUrl = (meta: CardMeta) =>
  `https://business-card-nft.vercel.app/card?${cardQuery(meta)}`;

export const cardUri = (meta: CardMeta) =>
  `https://business-card-nft.vercel.app/api/uri?${cardQuery(meta)}`;

export const cardQuery = ({
  twitter,
  github,
  name,
  subtitle,
  icon,
  address,
  theme,
}: CardMeta) =>
  `t=${encodeURI(twitter)}&s=${encodeURI(subtitle)}&n=${encodeURI(
    name
  )}&i=${encodeURI(icon)}&g=${encodeURI(github)}&a=${address}&theme=${theme}`;
