import { Poap } from "@/types/cardMetaTypes";
import PoapView from "./PoapView";

const CardBack: React.FC<{ name?: string; poaps?: Poap[] }> = ({
  name,
  poaps,
}) => {
  return (
    <div className="flex-col justify-center items-center p-4">
      <p className="text-center text-2xl font-bold">
        {`${name || "unknown"}'s Collection`}
      </p>
      <div className="w-full h-0.5 bg-neutral-content my-4"></div>
      {poaps && poaps.length > 0 && (
        <>
          <h2 className="text-3xl font-bold">POAPs</h2>
          <div className="grid grid-cols-4 gap-2">
            {poaps.map((poap) => (
              <PoapView poap={poap} key={poap.tokenId} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardBack;
