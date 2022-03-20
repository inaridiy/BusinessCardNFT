import { NextApiRequest, NextApiResponse } from "next";

type queryMeta = {
  [s in "t" | "s" | "n" | "i" | "g" | "a" | "theme"]: string;
};

const tokenUri = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    t: twitter,
    s: message,
    n: name,
    i: icon,
    g: github,
    theme,
  } = req.query as queryMeta;
  const queryString = new URLSearchParams(
    Object.entries(req.query as queryMeta)
  ).toString();

  const metadata = {
    description: "${name}'s business card made with Non-Fungible Meishi",
    image: `https://business-card-nft.vercel.app/api/ss?${queryString}`,
    external_url: `https://business-card-nft.vercel.app/card?${queryString}`,
    name: `${name}'s  Meishi`,
    animation_url: `https://business-card-nft.vercel.app/card?${queryString}`,
    attributes: [
      {
        trait_type: "Name",
        value: name,
      },
      {
        trait_type: "Message",
        value: message,
      },
      {
        trait_type: "Theme",
        value: theme,
      },
      {
        trait_type: "Icon",
        value: icon,
      },
      {
        trait_type: "twitter",
        value: twitter,
      },
      {
        trait_type: "github",
        value: github,
      },
    ],
  };
  res.status(200).json(metadata);
};

export default tokenUri;
