import { CardMeta } from "@/types/cardMetaTypes";
import { convertToStandardMeta } from "@/util/cardUtil";
import pinataSDK from "@pinata/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

invariant(process.env.PINATA_API_KEY && process.env.PINATA_SECRET_API_KEY);

const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

const API = (req: NextApiRequest, res: NextApiResponse) => {
  invariant(req.method === "POST");

  const standardMeta = convertToStandardMeta(req.body as CardMeta);
  console.log(standardMeta);

  res.end();
};
export default API;
