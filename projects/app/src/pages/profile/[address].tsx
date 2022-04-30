import { ProfileActions, ProfileInfo, ProfileTab } from "@/features/Profile";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <ProfileActions />
      <ProfileInfo />
      <div className="relative h-screen">
        <ProfileTab />
      </div>
    </>
  );
};

export default Home;
