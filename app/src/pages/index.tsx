import Card from "@/components/card";
import DefaultLayout from "@/components/DefaultLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="flex justify-center mt-4 sm:items-center h-full">
        <Card
          address="0x4aCc9c9eaFF1cf0e599dCb7a7164Cf2328224ca2"
          name="inaridiy.eth"
          icon="https://lh3.googleusercontent.com/nq68MZh2ZssfDMCvGL-iyx-3a4kXmU8jmtBO0vWgYAsPNiHxxWmoONT4dalD9cIAig_CxDMkvueN5GpDh2btDZkgTGZufONV8CJwzGk=w600"
          media={{
            github: "https://github.dev/inaridiy/BusinessCardNFT/tree/oldproto",
          }}
        />
      </div>
    </DefaultLayout>
  );
};

export default Home;
