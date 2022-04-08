import { getContract } from "@/util";
import { contractList } from "@/util/config";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

type BodyType = {
  func?: string;
  address?: string;
  argument?: string;
  signature?: string;
};

const sscard = async (req: NextApiRequest, res: NextApiResponse) => {
  invariant(req.method == "POST", "must be POST method");
  invariant(process.env.PRIVATE_KEY);
  const { argument, signature, func, address } = req.body as BodyType;
  console.log(req.body);
  invariant(
    argument &&
      signature &&
      func &&
      address &&
      ethers.utils.verifyMessage(argument, signature) === address
  );

  const contract = getContract(
    contractList["astar"],
    new ethers.Wallet(
      process.env.PRIVATE_KEY,
      new ethers.providers.JsonRpcProvider(contractList["astar"].rpc)
    )
  );
  invariant(func in contract);
  /* eslint-disable */
  const tx = await (contract as any)[func](...JSON.parse(argument));
  /* eslint-enable */
  console.log(tx);
  res.send({ status: "ok" });
};

export default sscard;
