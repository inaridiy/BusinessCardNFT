import { stopPropagation } from "@/util";

const MediaIcon: React.FC<{ children: React.ReactNode; href?: string }> = ({
  children,
  href,
}) => {
  if (href) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        onClick={stopPropagation}
        className="btn btn-square btn-ghost"
      >
        {children}
      </a>
    );
  } else {
    return <></>;
  }
};

export default MediaIcon;
