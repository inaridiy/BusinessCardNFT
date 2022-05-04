import Avatar from "boring-avatars";
import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineMenu, AiOutlineWallet } from "react-icons/ai";

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
      <nav className="justify-center w-full shadow-2xl rounded-box navbar bg-neutral text-neutral">
        <LinkIcon href="/">
          <AiOutlineHome size="2rem" className="fill-gray-100" />
        </LinkIcon>
        <LinkIcon href="/print">
          <AiOutlineWallet size="2rem" className="fill-gray-100" />
        </LinkIcon>
        <LinkIcon href="/print">
          <AiOutlineMenu size="2rem" className="fill-gray-100" />
        </LinkIcon>
      </nav>
      <NextLink href="/profile/0x4aCc9c9eaFF1cf0e599dCb7a7164Cf2328224ca2">
        <a className="avatar online">
          <div className="w-14 rounded-full ring ring-offset-2 shadow-2xl ring-primary ring-offset-base-100">
            <Avatar
              size="100%"
              square={true}
              name="0x4aCc9c9eaFF1164Cf2328"
              variant="marble"
            />
          </div>
        </a>
      </NextLink>
    </div>
  );
};

export const DefaultLayout: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col  min-h-full bg-base-200" data-theme="light">
      <div className="flex flex-col grow mb-24">{children}</div>
      <MobileBottomNav />
    </div>
  );
};
