import { NextApiRequest, NextApiResponse } from "next";
import * as playwright from "playwright-aws-lambda";

const sscard = async (req: NextApiRequest, res: NextApiResponse) => {
  const browser = await playwright.launchChromium({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 400, height: 650 },
  });
  const queryString = new URLSearchParams(
    Object.entries(req.query as Record<string, string>)
  ).toString();
  await page.goto(`https://business-card-nft.vercel.app/card?${queryString}`, {
    waitUntil: "networkidle",
  });
  const image = await page.screenshot({ type: "png", omitBackground: true });
  await browser.close();
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  res.end(image);
};

export default sscard;
