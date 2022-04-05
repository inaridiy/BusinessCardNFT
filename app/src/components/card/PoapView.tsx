import { Poap } from "@/types/cardMetaTypes";
import { stopPropagation } from "@/util";
const PoapView: React.FC<{ poap: Poap }> = ({ poap }) => {
  const close = (e: React.MouseEvent<HTMLElement>) => {
    window.location.href = "#";
    e.stopPropagation();
  };
  return (
    <>
      <a
        className="rounded-full bg-accent shadow-xl"
        href={`#${poap.tokenId}`}
        onClick={stopPropagation}
      >
        <img src={poap.event.image_url} alt={poap.event.name} />
      </a>
      <div className="modal" id={poap.tokenId} onClick={close}>
        <div className="modal-box text-base-content " onClick={stopPropagation}>
          <div className="flex items-center gap-2 py-4">
            <img
              src={poap.event.image_url}
              className="w-1/3"
              alt={poap.event.name}
            />
            <h3 className="font-bold text-lg ">{poap.event.name}</h3>
          </div>
          <p>{poap.event.description}</p>
          <div className="modal-action">
            <a className="btn btn-ghost" href="#">
              Close
            </a>
            {poap.event.event_url && (
              <a className="btn" href={poap.event.event_url}>
                View Event Page
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PoapView;
