import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export const SimpleEaseIn: React.VFC<{
  children?: React.ReactNode;
  show?: boolean;
  appear?: boolean;
}> = ({ children, show, appear }) => {
  return (
    <Transition
      as={Fragment}
      show={show}
      appear={appear}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
};
