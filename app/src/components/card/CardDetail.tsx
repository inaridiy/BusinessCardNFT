import Card from "@/components/card";
import { useFetchMeta } from "@/hooks/fetcher";
import { getCardImage } from "@/util/cardUtil";
import { BigNumber } from "ethers";
import { memo, useState } from "react";
import ModalBase from "../ModalBase";

const CardAdminDetail: React.FC<{
  tokenId: BigNumber;
}> = ({ tokenId: id }) => {
  const [openView, setOpenView] = useState(false);
  const query = useFetchMeta("astar", id);

  return (
    <>
      <ModalBase open={openView} onChange={setOpenView}>
        <div className="scale-75 sm:scale-125">
          <Card {...query.data} />
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
      </div>
    </>
  );
};

export default memo(CardAdminDetail);
