import DefaultLayout from "@/components/DefaultLayout";
import type { NextPage } from "next";

const Receive: NextPage = () => {
  return (
    <DefaultLayout>
      <ReceiveBody />
    </DefaultLayout>
  );
};

export const ReceiveBody = () => {
  return (
    <div className="flex items-center justify-center m-2">
      <iframe
        src={`https://business-card-nft.vercel.app/card?t=&s=&n=inaridiy.eth&i=&a=0x4acc9c9eaff1cf0e599dcb7a7164cf2328224ca2&theme=aqua&g=`}
        className="artboard phone-2 rounded-lg shadow-sm hidden sm:block"
      />
      <div className="flex-col flex gap-2 sm:max-w-sm  md:max-w-md w-full"></div>
    </div>
  );
};

export default Receive;
