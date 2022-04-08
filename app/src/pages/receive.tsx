import Card from "@/components/card";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import ModalBase from "@/components/ModalBase";
import { UsefulButton } from "@/components/UsefulBtn";
import { useWeb3 } from "@/hooks";
import { useCardByTicket } from "@/hooks/fetcher";
import { getCardImage } from "@/util/cardUtil";
import { useRouter } from "next/router";
import { useState } from "react";

const Page = () => {
  const {
    query: { ticket },
  } = useRouter();
  const [openView, setIsOpenView] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { provider } = useWeb3();
  const query = useCardByTicket("astar", String(ticket));
  const receive = () => {
    try {
      setStatus("Sign Receive Message");
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
      <div
        className="mb-16 grow flex flex-col items-center justify-center bg-base-300"
        data-theme={query.data?.theme || "light"}
      >
        <div className="w-2/3 card">
          <figure
            className="w-full aspect-card bg-base-300"
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
