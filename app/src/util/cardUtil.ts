import { CardMeta } from "@/types/cardMeta";

export const cardMetaToUrl = ({
  twitter,
  github,
  name,
  subtitle,
  icon,
  address,
  theme,
}: CardMeta) =>
  `https://business-card-nft.vercel.app/card?t=${encodeURI(
    twitter
  )}&s=${encodeURI(subtitle)}&n=${encodeURI(name)}&i=${encodeURI(
    icon
  )}&g=${encodeURI(github)}&a=${address}&theme=${theme}`;
