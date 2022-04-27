import { Avatar } from "@/features/Avatar";
import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AiOutlineBars, AiOutlineHome, AiOutlineWallet } from "react-icons/ai";

const LinkIcon: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
}> = ({ href, children, className }) => {
  const router = useRouter();

  return (
    <div className={`h-full flex items-center`}>
      <NextLink href={href}>
        <a
          className={clsx(
            "btn btn-circle",
            router.route === href || "opacity-50",
            className
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
    <div className="flex fixed bottom-0 gap-4 items-center px-10 pb-4 w-full">
      <nav className="justify-center w-full rounded-full navbar bg-neutral text-neutral">
        <LinkIcon href="/">
          <AiOutlineHome size="2rem" className="fill-base-300" />
        </LinkIcon>
        <LinkIcon href="/print">
          <AiOutlineWallet size="2rem" className="fill-base-300" />
        </LinkIcon>
        <LinkIcon href="/print">
          <AiOutlineBars size="2rem" className="fill-base-300" />
        </LinkIcon>
      </nav>
      <div className="avatar online">
        <div className="w-16 rounded-full ring ring-offset-2 shadow-2xl ring-primary ring-offset-base-100">
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export const DefaultLayout: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col  min-h-full bg-base-200">
      <div className="flex flex-col grow mb-24">{children}</div>
      <MobileBottomNav />
    </div>
  );
};
