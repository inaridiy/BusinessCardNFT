import { Card } from "@/features/Card";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute w-full h-64 bg-gradient-to-br from-primary to-secondary" />
      <div className="flex justify-center scale-75">
        <Card address="Hello" />
      </div>
    </div>
  );
};

export default Home;
