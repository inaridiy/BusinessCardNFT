import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import dynamic from "next/dynamic";
import type { QrReaderProps } from "react-qr-reader";
const QrReader = dynamic(
  async () => (await import("react-qr-reader")).QrReader,
  {
    ssr: false,
  }
) as React.FC<QrReaderProps>;
const pushTo = (url: string) => {
  if (location) {
    location.href = url;
  }
};

const Page = () => {
  return (
    <div className="grow flex">
      <div className="bg-base-300 w-full p-8 flex items-center">
        <QrReader
          className="bg-base-300 w-full aspect-square card shadow-lg"
          videoContainerStyle={{ flexGrow: "1" }}
          videoStyle={{ objectFit: "cover", height: "100%" }}
          onResult={(result) => result && pushTo(String(result))}
          constraints={{ facingMode: { exact: "environment" } }}
        />
      </div>
    </div>
  );
};
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};

export default Page;
