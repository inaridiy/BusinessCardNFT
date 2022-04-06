import { CardMeta } from "@/types/cardMetaTypes";
import { stopPropagation } from "@/util";
import { getPoap } from "@/util/cardUtil";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

const Card: React.FC<CardMeta> = (meta) => {
  const { data: poaps } = useQuery(
    ["poap", meta.address],
    () => getPoap(meta.address as string),
    { enabled: Boolean(meta.address), refetchOnWindowFocus: false }
  );
  const [isFlip, setIsFlip] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const mouseListener = (e: MouseEvent) => {
      setX(e.view?.innerWidth ? e.x / e.view?.innerWidth - 0.5 : x);
      setY(e.view?.innerHeight ? e.y / e.view?.innerHeight - 0.5 : y);
    };
    const touchListener = (e: TouchEvent) => {
      setX(
        e.view?.innerWidth ? e.touches[0].clientX / e.view?.innerWidth - 0.5 : x
      );
      setY(
        e.view?.innerHeight
          ? e.touches[0].clientY / e.view?.innerHeight - 0.5
          : y
      );
    };
    if (window) {
      window.addEventListener("mousemove", mouseListener);
      window.addEventListener("touchmove", touchListener);
    }
    return () => {
      window?.removeEventListener("mousemove", mouseListener);
      window?.removeEventListener("touchmove", touchListener);
    };
  }, []);

  return (
    <div
      onClick={stopPropagation}
      style={{
        perspective: "1500px",
        touchAction: "none",
        backgroundColor: "transparent",
      }}
      data-theme={meta.theme || "light"}
    >
      <div
        className="artboard phone-1 relative"
        style={{
          transform: `rotateY(${x * 10}deg) rotateX(${
            y * -10
          }deg) translate3D(${x * 5}%,${y * 5}%,0)`,
          perspective: "600px",
        }}
        onClick={() => setIsFlip(!isFlip)}
      >
        <div
          className="card bg-base-100 shadow-xl h-full transition-all duration-500"
          style={{
            transform: `rotateY(${isFlip ? "180deg" : "0"})`,
            backfaceVisibility: "hidden",
          }}
        >
          <CardFront {...meta} />
        </div>
        <div
          className="absolute card bg-neutral shadow-xl text-neutral-content inset-0 transition-all duration-500"
          style={{
            transform: `rotateY(${isFlip ? "0" : "-180deg"}) translate3D(${
              x * 5
            }%,${y * 5}%,0)`,
            backfaceVisibility: "hidden",
          }}
        >
          <CardBack name={meta.name} poaps={poaps} />
        </div>
      </div>
    </div>
  );
};

export default Card;
