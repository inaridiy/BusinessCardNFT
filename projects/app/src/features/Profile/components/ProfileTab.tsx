import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const ProfileTab = () => {
  const { query } = useRouter();
  return (
    <div className="grid sticky top-0 grid-cols-2 bg-base-100">
      <NextLink scroll={false} href={`/profile/${String(query.address)}`}>
        <a
          className={clsx(
            "rounded-none btn btn-ghost",
            query.tab === undefined && "border-0 border-b-2 border-neutral"
          )}
        >
          Collected
        </a>
      </NextLink>
      <NextLink
        scroll={false}
        href={`/profile/${String(query.address)}?tab=created`}
      >
        <a
          className={clsx(
            "rounded-none btn btn-ghost",
            query.tab === "created" && "border-0 border-b-2 border-neutral"
          )}
        >
          Created
        </a>
      </NextLink>
    </div>
  );
};
