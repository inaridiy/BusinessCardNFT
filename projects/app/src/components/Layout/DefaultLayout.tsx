import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineWallet } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const LinkIcon: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  const router = useRouter();

  return (
    <div className={`h-full flex items-center`}>
      <NextLink href={href}>
        <a
          className={clsx(
            "btn btn-circle",
            router.route === href || "opacity-75"
          )}
        >
          {children}
        </a>
      </NextLink>
    </div>
  );
};

const MobileBottomNav: React.VFC = () => {
  return (
    <div className="fixed bottom-0 pb-4 px-10 w-full">
      <nav className="navbar rounded-full shadow-2xl w-full bg-neutral text-neutral justify-center">
        <LinkIcon href="/">
          <AiOutlineHome size="2rem" className="fill-base-300" />
        </LinkIcon>
        <LinkIcon href="/print">
          <AiOutlineWallet size="2rem" className="fill-base-300" />
        </LinkIcon>
        <LinkIcon href="/print">
          <BsPerson size="2rem" className="fill-base-300" />
        </LinkIcon>
      </nav>
    </div>
  );
};

export const DefaultLayout: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="bg-base-100 min-h-full">
      {children}
      <MobileBottomNav />
    </div>
  );
};
