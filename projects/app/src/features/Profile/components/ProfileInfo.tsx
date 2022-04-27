import { Avatar } from "@/features/Avatar";
import { BsGithub, BsTwitter } from "react-icons/bs";

export const ProfileInfo = () => {
  return (
    <div className="flex flex-col gap-2 items-center pb-2 font-mono bg-base-100">
      <div className="avatar">
        <div className="w-32 rounded-2xl hover:rounded-3xl shadow hover:shadow-2xl transition-all hover:rotate-12">
          <Avatar />
        </div>
      </div>
      <div className="font-bold text-center">
        <div className="text-3xl">inaridiy.eth</div>
        <div>
          Address
          <span className="ml-2 text-sm">0x4aCc...ca2</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="bg-github btn btn-circle btn-sm">
          <BsGithub size="1.2rem" />
        </button>
        <button className="bg-twitter btn btn-circle btn-sm">
          <BsTwitter size="1.2rem" />
        </button>
      </div>
    </div>
  );
};
