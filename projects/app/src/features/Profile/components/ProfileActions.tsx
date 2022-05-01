import { SimpleEaseIn } from "@/components/Transition";
import { useSetShareData } from "@/stores/modal";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { BsPencilFill, BsShareFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

export const ProfileActions = () => {
  const router = useRouter();
  const setShare = useSetShareData();

  return (
    <div className="flex justify-between p-2 w-full bg-base-100">
      <button className="btn btn-ghost btn-circle" onClick={router.back}>
        <IoIosArrowBack size="1.5rem" />
      </button>
      <Menu>
        <Menu.Button className="btn btn-ghost btn-circle">
          <BsThreeDotsVertical size="1.5rem" />
        </Menu.Button>
        <SimpleEaseIn>
          <Menu.Items className="flex absolute right-0 z-10 mt-12 mr-4 rounded-lg focus:outline-none  shadow-menu bg-base-100 menu">
            <Menu.Item>
              {({ active }) => (
                <li>
                  <a
                    className={clsx(
                      active && "bg-primary text-primary-content",
                      "font-bold"
                    )}
                  >
                    <BsPencilFill />
                    Edit Profile
                  </a>
                </li>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <li>
                  <button
                    className={clsx(
                      active && "bg-primary text-primary-content",
                      "font-bold"
                    )}
                    onClick={() =>
                      setShare({
                        title: `Share User`,
                        text: "Share 0x4aCc...ca2 With:",
                        url: "http://localhost:3000/profile/0x4aCc9c9eaFF1cf0e599dCb7a7164Cf2328224ca2",
                      })
                    }
                  >
                    <BsShareFill />
                    Share
                  </button>
                </li>
              )}
            </Menu.Item>
          </Menu.Items>
        </SimpleEaseIn>
      </Menu>
    </div>
  );
};
