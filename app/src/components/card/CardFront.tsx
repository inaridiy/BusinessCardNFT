import { Media } from "@/types/cardMetaTypes";
import { stopPropagation } from "@/util";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { CyberConnectIcon } from "../ui/CyberConnect";

const CardFront: React.FC<{
  icon?: string;
  name?: string;
  description?: string;
  media?: Media;
}> = ({
  icon,
  name,
  description,
  media: { twitter, github, cyberConnect } = {},
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
        <p>{description || ""}</p>

        <div className="card-actions justify-end items-center gap-0">
          {twitter && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={twitter}
              onClick={stopPropagation}
              className="btn btn-square btn-ghost"
            >
              <BsTwitter size="2rem" />
            </a>
          )}
          {github && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={github}
              onClick={stopPropagation}
              className="btn btn-square btn-ghost"
            >
              <BsGithub size="2rem" />
            </a>
          )}
          {cyberConnect && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-square btn-ghost"
              href={cyberConnect}
              onClick={stopPropagation}
            >
              <CyberConnectIcon />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default CardFront;
