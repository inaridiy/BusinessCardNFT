import Card from "@/components/card";
import { useFetchMeta, useTickets } from "@/hooks/fetcher";
import { useMainCard } from "@/hooks/useMainCard";
import { stopPropagation } from "@/util";
import { getCardImage } from "@/util/cardUtil";
import { selectFirst } from "@/util/web3Util";
import { BigNumber } from "ethers";
import { memo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import _QRCode, { QRCodeProps } from "react-qr-code";
import ModalBase from "../ModalBase";

const QRCode = _QRCode as unknown as React.FC<QRCodeProps>;

const CardAdminDetail: React.FC<{
  tokenId: BigNumber;
}> = ({ tokenId: id }) => {
  const [openView, setOpenView] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [ticketView, setTicketView] = useState(false);
  const [optionView, setOptionView] = useState(false);
  const query = useFetchMeta("astar", id);
  const { tickets } = useTickets("astar");
  const ticket = selectFirst(tickets.filter((e) => e.tokenId.eq(id)));
  const { setMainCard } = useMainCard();
  const url = `https://business-card-nft.vercel.app/receive?ticket=${
    ticket?.ticket || ""
  }`;
  const copyUrl = () => {
    void navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };
  return (
    <>
      <ModalBase open={openView} onChange={setOpenView}>
        <div className="scale-75 sm:scale-125">
          <Card {...query.data} />
        </div>
      </ModalBase>
      <ModalBase open={ticketView} onChange={setTicketView} mode="auto">
        <div
          className="modal-box flex flex-col items-center"
          onClick={stopPropagation}
        >
          <h2 className="text-3xl font-bold">{ticket?.ticket}</h2>
          <QRCode value={url} size={128} />
          <div
            className="tooltip  tooltip-bottom"
            data-tip={isCopied ? "Copied!!" : "Click to Copy"}
          >
            <button className="btn btn-ghost" onClick={copyUrl}>
              {url}
            </button>
          </div>
        </div>
      </ModalBase>
      <ModalBase open={optionView} onChange={setOptionView} mode="auto">
        <div
          className="modal-box flex-col flex gap-1"
          onClick={stopPropagation}
          data-theme={query.data?.theme || "light"}
        >
          <button
            className="btn w-full btn-primary"
            onClick={() => void setMainCard(id)}
          >
            Set to Main Card
          </button>
          <button
            className="btn w-full btn-outline btn-error"
            onClick={() => setOptionView(false)}
          >
            Close
          </button>
        </div>
      </ModalBase>
      <div
        className="relative card bg-base-100 shadow"
        data-theme={query.data?.theme || "light"}
      >
        <figure
          className="w-full aspect-card bg-base-300"
          onClick={() => setOpenView(true)}
        >
          <span className="btn btn-ghost loading absolute z-10" />
          {query.data && (
            <img
              src={getCardImage(query.data)}
              alt="card thumbnail"
              className="z-10"
            />
          )}
        </figure>
        <div className="flex">
          <button
            className="btn btn-secondary rounded-none grow"
            onClick={() => setTicketView(true)}
          >
            Ticket
          </button>
          <button
            className="btn btn-primary rounded-none btn-square"
            onClick={() => setOptionView(true)}
          >
            <BsThreeDotsVertical size="1.5rem" />
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(CardAdminDetail);
