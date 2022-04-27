import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

export const ProfileActions = () => {
  return (
    <div className="flex justify-between p-2 w-full bg-base-100">
      <button className="btn btn-ghost btn-circle">
        <IoIosArrowBack size="1.5rem" />
      </button>
      <button className="btn btn-ghost btn-circle">
        <BsThreeDotsVertical size="1.5rem" />
      </button>
    </div>
  );
};
