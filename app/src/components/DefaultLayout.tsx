import NextLink from "next/link";
import { AiOutlineHome, AiOutlineScan, AiOutlineWallet } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";

const DefaultLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-full bg-base-200 text-base-content flex flex-col transition-all">
      {children}
      <MobileBar />
    </div>
  );
};

export const Header: React.FC = () => {
  return (
    <nav className="navbar fixed justify-center bg-base-100 h-16">
      <NextLink href="/">
        <a className="btn btn-ghost text-2xl normal-case">NFMeishi</a>
      </NextLink>
    </nav>
  );
};

export const MobileBar: React.FC<{ children?: React.ReactNode }> = () => {
  return (
    <nav className="navbar bg-base-100 h-16 fixed w-full bottom-0 justify-center sm:hidden">
      <a className="btn btn-ghost flex flex-col">
        <AiOutlineHome size="2rem" />
      </a>
      <a className="btn btn-ghost flex-col">
        <BsPencil size="2rem" />
      </a>
      <a className="btn btn-ghost flex-col">
        <AiOutlineWallet size="2rem" />
      </a>
      <a className="btn btn-ghost flex-col">
        <AiOutlineScan size="2rem" />
      </a>
    </nav>
  );
};

export default DefaultLayout;
