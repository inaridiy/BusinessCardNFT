import DefaultLayout from "@/components/DefaultLayout";
import { useContract } from "@/hooks/useContract";
import { useWeb3 } from "@/hooks/useWeb3";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Receive: NextPage = () => {
  return (
    <DefaultLayout>
      <ReceiveBody />
    </DefaultLayout>
  );
};

const handler =
  (cb: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
    cb(e.target.value);

export const ReceiveBody = () => {
  const [animationUrl, setAnimationUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const { account, isTargetChain, isLoading, connectWallet } = useWeb3();
  const { query } = useRouter();
  const [ticket, setTicket] = useState("");
  const [name, setName] = useState("");
  const contract = useContract();

  const receive = async () => {
    try {
      setIsMinting(true);
      await contract?.receiveCard(ticket);
      window.location.href = "#comp";
    } catch (e) {
      console.error(e);
    }
  };

  const loadNFT = async (ticket: string) => {
    try {
      setIsFetching(true);
      if (contract) {
        const { tokenId } = await contract.ticket(ticket);
        const uri = await contract.uri(tokenId);
        const { animation_url, name } = (await (await fetch(uri)).json()) as {
          animation_url: string;
          name: string;
        };
        setName(name);
        setAnimationUrl(animation_url);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    if (query.ticket) {
      void loadNFT(String(query.ticket));
      setTicket(String(query.ticket));
    }
  }, [query]);
  return (
    <>
      <h1>{name}</h1>
      <div className="flex items-center p-2 gap-4 justify-center">
        <iframe
          src={
            animationUrl ||
            `https://business-card-nft.vercel.app/card?t=&s=&n=inaridiy.eth&i=&a=0x4acc9c9eaff1cf0e599dcb7a7164cf2328224ca2&theme=aqua&g=`
          }
          className="artboard phone-2 rounded-lg shadow-sm hidden sm:block"
        />
        <div className="flex-col flex gap-2 max-w-xs md:max-w-md w-full">
          <label className="label text-xl font-bold">Ticket</label>
          <input
            type="text"
            placeholder="type your ticket"
            className="input input-bordered"
            value={ticket}
            onChange={handler(setTicket)}
          />
          {isMinting ? (
            <button className="btn btn-primary loading">Minting</button>
          ) : isLoading || isFetching ? (
            <button className="btn btn-primary loading">Loading</button>
          ) : !isTargetChain ? (
            <button className="btn btn-error" disabled>
              Chain is different.
            </button>
          ) : account && animationUrl ? (
            <button className="btn btn-primary" onClick={() => void receive()}>
              Mint Your Card
            </button>
          ) : !animationUrl ? (
            <button className="btn btn-primary">Ticket does not exist.</button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => void connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export const MintModal = () => {
  return (
    <div className="modal" id="comp">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Non Fungible Meishi received!</h3>
        <p className="py-4">Wait a moment and check your Wallet.</p>
        <div className="modal-action">
          <a href="#" className="btn">
            Close
          </a>
        </div>
      </div>
    </div>
  );
};

export default Receive;
