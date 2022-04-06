import Card from "@/components/card";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";

const Page = () => {
  return (
    <div className="flex justify-center mb-16 items-center grow">
      <Card
        address="0x4aCc9c9eaFF1cf0e599dCb7a7164Cf2328224ca2"
        name="inaridiy.eth"
        theme="light"
        icon="https://lh3.googleusercontent.com/nq68MZh2ZssfDMCvGL-iyx-3a4kXmU8jmtBO0vWgYAsPNiHxxWmoONT4dalD9cIAig_CxDMkvueN5GpDh2btDZkgTGZufONV8CJwzGk=w600"
        github="https://github.dev/inaridiy/BusinessCardNFT/tree/oldproto"
      />
    </div>
  );
};
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};

export default Page;
