import { CardMeta } from "@/types/cardMetaTypes";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { CyberConnectIcon } from "../ui/CyberConnect";
import MediaIcon from "./MediaIcon";

const CardFront: React.FC<CardMeta> = ({
  icon,
  name,
  description,
  github,
  cyberConnect,
  twitter,
}) => {
  return (
    <>
      <figure>
        {icon && (
          <img
            className="h-48 bg-primary mask mask-hexagon mt-4 aspect-square object-cover"
            src={icon}
            alt="Profile Icon"
          />
        )}
      </figure>
      <div className="card-body">
        <h1 className="card-title text-4xl">{name || "Unknown"}</h1>
        <p className="grow">{description || ""}</p>

        <div className="card-actions justify-end items-center gap-0">
          <MediaIcon
            href={twitter && `https://twitter.com/${twitter.replace(/^@/, "")}`}
          >
            <BsTwitter size="2rem" />
          </MediaIcon>
          <MediaIcon href={github && `https://github.com/${github}`}>
            <BsGithub size="2rem" />
          </MediaIcon>
          <MediaIcon
            href={
              cyberConnect &&
              `https://app.cyberconnect.me/address/${String(cyberConnect)}`
            }
          >
            <CyberConnectIcon />
          </MediaIcon>
        </div>
      </div>
    </>
  );
};

export default CardFront;
