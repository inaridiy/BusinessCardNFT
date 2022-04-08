import Card from "@/components/card";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import { UsefulButton } from "@/components/UsefulBtn";
import { useMainCard } from "@/hooks/useMainCard";
import { useRouter } from "next/router";

const Page = () => {
  const { meta } = useMainCard();
  const router = useRouter();
  const movePrint = () => void router.push("/print");

  return (
    <div className="flex justify-center items-center grow">
      {meta ? (
        <Card {...meta} />
      ) : (
        <UsefulButton className="btn" onClick={movePrint}>
          Create Meishi
        </UsefulButton>
      )}
    </div>
  );
};
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};

export default Page;
