import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import NextLink from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function Page() {
  return (
    <div className="flex justify-center mb-16 items-center h-full">
      <NextLink href="print">
        <a className="btn btn-circle fixed right-4 bottom-20">
          <AiOutlinePlus size="2rem" />
        </a>
      </NextLink>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};
