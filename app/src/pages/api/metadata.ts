import { CardMeta } from "@/types/cardMetaTypes";
import { convertToStandardMeta } from "@/util/cardUtil";
import pinataSDK from "@pinata/sdk";
import { Wallet } from "ethers";
import { arrayify, keccak256, toUtf8Bytes } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

invariant(process.env.PINATA_API_KEY && process.env.PINATA_SECRET_API_KEY);

const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  invariant(req.method === "POST");

  const standardMeta = convertToStandardMeta(req.body as CardMeta);
  const ipfsRes = await pinata.pinJSONToIPFS(standardMeta);
  invariant(process.env.PRIVATE_KEY);
  const singer = new Wallet(process.env.PRIVATE_KEY);
  const signature = await singer.signMessage(
    arrayify(keccak256(toUtf8Bytes(`ipfs://${ipfsRes.IpfsHash}`)))
  );

  res.json({ uri: `ipfs://${ipfsRes.IpfsHash}`, signature });
};
export default API;
