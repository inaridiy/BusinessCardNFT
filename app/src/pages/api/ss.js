import * as playwright from "playwright-aws-lambda";

const tokenUri = async (req, res) => {
  const browser = await playwright.launchChromium({ headless: true });
  const page = await browser.newPage({ viewport: { width: 400, height: 600 } });
  const queryString = new URLSearchParams(Object.entries(req.query)).toString();
  await page.goto(`https://business-card-nft.vercel.app/card?${queryString}`);
  const image = await page.screenshot({ type: "png" });
  await browser.close();
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  res.end(image);
};

export default tokenUri;
