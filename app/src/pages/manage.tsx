import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import { useContract, useWeb3 } from "@/hooks";
import { NameCard } from "@/util/contract";
import NextLink from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "react-query";

export default function Page() {
  const { account } = useWeb3();
  const contract = useContract("astar");
  const { data } = useQuery(
    ["cards", account?.id],
    () => (contract as NameCard).havingURI(account?.id as string),
    { enabled: Boolean(account && contract), refetchOnWindowFocus: false }
  );
  console.log(data);
  return (
    <div className="flex justify-center mb-16 items-center h-full">
      <NextLink href="/print">
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
