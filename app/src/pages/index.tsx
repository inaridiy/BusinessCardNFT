import DefaultLayout from "@/components/DefaultLayout";
import type { NextPage } from "next";
import Link from "next/link";

const sampleCard = `https://business-card-nft.vercel.app/card?t=unknown_gakusei&s=High%20school%20web3%20engineer&n=inaridiy.eth&i=https%3A%2F%2Flh3.googleusercontent.com%2Fnq68MZh2ZssfDMCvGL-iyx-3a4kXmU8jmtBO0vWgYAsPNiHxxWmoONT4dalD9cIAig_CxDMkvueN5GpDh2btDZkgTGZufONV8CJwzGk%3Dw600&a=0x4acc9c9eaff1cf0e599dcb7a7164cf2328224ca2&theme=light&g=inaridiy`;

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-row items-center justify-center p-2">
        <div className="sm:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Print Your Business Card On AStar Network
          </h1>
          <p className="py-6">
            Print your own business card on the blockchain as an ERC1155 NFT
          </p>
          <Link href="/print">
            <a className="btn btn-primary btn-lg">Mint Your Card!!</a>
          </Link>
        </div>
        <iframe
          src={sampleCard}
          className="artboard phone-2 rounded-lg shadow-sm hidden sm:block w-1/2"
        />
      </div>
    </DefaultLayout>
  );
};

export default Home;
