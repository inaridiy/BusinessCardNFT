import type { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

const API = (req: NextApiRequest, res: NextApiResponse) => {
  invariant(req.method === "POST" && process.env.PRIVATE_KEY);
};
export default API;
