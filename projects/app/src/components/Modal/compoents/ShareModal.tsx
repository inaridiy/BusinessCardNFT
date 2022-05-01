import { useShareData } from "@/stores/modal";
import { useCallback } from "react";
import { BsLine, BsLink45Deg, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { ModalBase } from "./ModalBase";

export const ShareModal: React.VFC = () => {
  const [shareData, setShareData] = useShareData();
  const onClose = useCallback(() => setShareData(null), [setShareData]);
  return (
    <ModalBase open={Boolean(shareData)} onChange={onClose}>
      <h2 className="pl-2 text-2xl font-bold">{shareData?.title}</h2>
      <div className="py-0 divider"></div>
      <div className="flex overflow-y-auto gap-6 justify-center">
        <div className="flex flex-col items-center">
          <button className="btn btn-circle">
            <BsLink45Deg size="1.8rem" className="fill-white" />
          </button>
          <div className="text-sm font-bold">Copy URL</div>
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-twitter border-twitter btn btn-circle">
            <BsTwitter size="1.8rem" className="fill-white" />
          </button>
          <div className="text-sm font-bold">Twitter</div>
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-facebook border-facebook btn btn-circle">
            <FaFacebookF size="1.8rem" className="fill-white" />
          </button>
          <div className="text-sm font-bold">FaceBook</div>
        </div>
        <div className="flex flex-col items-center">
          <button className="pt-1 bg-line border-line -pb-2 btn btn-circle">
            <BsLine size="1.8rem" className="fill-white" />
          </button>
          <div className="text-sm font-bold">FaceBook</div>
        </div>
      </div>
    </ModalBase>
  );
};
