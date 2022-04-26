import { Card } from "@/features/Card";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex relative grow justify-center items-center">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-br from-primary to-secondary" />
      <div className="flex justify-center">
        <Card address="Hello" />
      </div>
    </div>
  );
};

export default Home;
