import Card from "@/components/card";
import { useFetchMeta, useTickets } from "@/hooks/fetcher";
import { TicketMeta } from "@/types/cardMetaTypes";
import { stopPropagation } from "@/util";
import { getCardImage } from "@/util/cardUtil";
import { BigNumber } from "ethers";
import { memo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ModalBase from "../ModalBase";

const TicketDetail: React.FC<{ ticket: TicketMeta }> = memo(
  function _TicketDetail({ ticket }) {
    return (
      <div className="card shadow-2xl bg-neutral text-neutral-content">
        <div className="card-body">
          <div className="text-xl font-bold">{ticket.ticket}</div>
        </div>
      </div>
    );
  }
);

const CardAdminDetail: React.FC<{
  tokenId: BigNumber;
}> = ({ tokenId: id }) => {
  const [openView, setOpenView] = useState(false);
  const [ticketView, setTicketView] = useState(false);
  const query = useFetchMeta("astar", id);
  const { getTicket, tickets } = useTickets("astar");
  const openTicketView = () => {
    setTicketView(true);
    void getTicket();
  };
  console.log(id.toString());

  return (
    <>
      <ModalBase open={openView} onChange={setOpenView}>
        <div className="scale-75 sm:scale-125">
          <Card {...query.data} />
        </div>
      </ModalBase>
      <ModalBase open={ticketView} onChange={setTicketView} mode="auto">
        <div className="modal-box p-4" onClick={stopPropagation}>
          <div className="modal-action items-center justify-between">
            <h2 className="text-2xl font-bold">Meishi Tickets</h2>
            <button className="btn">
              New Ticket
              <AiOutlinePlus size="1.5rem" />
            </button>
          </div>
          <div className="grid grid-cols-2 mt-2">
            {tickets.map((ticket) => (
              <TicketDetail key={ticket.ticket} ticket={ticket} />
            ))}
          </div>
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
            onClick={openTicketView}
          >
            Ticket
          </button>
          {/* <button
            className="btn btn-primary rounded-none grow"
            onClick={() => setInfoView(true)}
          >
            Edit
          </button> */}
        </div>
      </div>
    </>
  );
};

export default memo(CardAdminDetail);
