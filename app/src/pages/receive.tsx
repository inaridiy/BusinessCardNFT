import Card from "@/components/card";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import ModalBase from "@/components/ModalBase";
import { UsefulButton } from "@/components/UsefulBtn";
import { useContract } from "@/hooks";
import { useCardByTicket } from "@/hooks/fetcher";
import { getCardImage } from "@/util/cardUtil";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Page = () => {
  const {
    query: { ticket },
  } = useRouter();
  const [openView, setIsOpenView] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const contract = useContract("astar");
  const query = useCardByTicket("astar", String(ticket));
  const router = useRouter();
  const receive = async () => {
    try {
      if (contract && typeof ticket === "string") {
        setStatus("Sign Receive Message");
        const tx = await contract.receiveCard(ticket);
        await tx.wait();
        await router.push("/wallet");
      }
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ? String(err.message) : String(e));
    } finally {
      setStatus("");
    }
  };
  return (
    <>
      <ModalBase open={openView} onChange={setIsOpenView}>
        <div className="scale-75 sm:scale-110">
          <Card {...query.data} />
        </div>
      </ModalBase>
      <ModalBase open={Boolean(status)} onChange={setIsOpenView} mode="auto">
        <div className="modal-box">
          <span className="btn loading btn-ghost w-full" />
          <p className="text-2xl font-bold text-center">{status}</p>
        </div>
      </ModalBase>
      <div
        className=" grow flex flex-col items-center justify-center bg-base-300 gap-2"
        data-theme={query.data?.theme || "light"}
      >
        {error && (
          <div className="alert alert-error font-bold max-w-xl">
            <div>
              <AiOutlineCloseCircle className="stroke-current" size="2.5rem" />
              <span>{error}</span>
            </div>
          </div>
        )}
        <div className="w-2/3 max-w-lg card">
          <figure
            className="w-full aspect-card bg-base-300 cursor-pointer"
            onClick={() => setIsOpenView(true)}
          >
            <span className="btn btn-ghost loading absolute z-10" />
            <img
              src={getCardImage({})}
              alt="card thumbnail"
              className="absolute z-10"
            />
            {query.data && (
              <img
                src={getCardImage(query.data)}
                alt="card thumbnail"
                className="z-10"
              />
            )}
          </figure>
        </div>

        <UsefulButton
          className="btn btn-primary"
          isLoading={Boolean(status)}
          onClick={() => void receive()}
        >
          Receive Meishi!!
        </UsefulButton>
      </div>
    </>
  );
};
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};

export default Page;
