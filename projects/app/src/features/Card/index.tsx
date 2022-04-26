import { stopPropagation } from "@/utils";
import { useEffect, useState } from "react";
import { CardMeta } from "./types";

export const Card: React.FC<CardMeta> = (meta) => {
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
      className="relative bg-transparent"
      data-theme={meta.theme || "light"}
      style={{ perspective: "1500px", touchAction: "none" }}
      onClick={(e) => (stopPropagation(e), setIsFlip(!isFlip))}
    >
      <div
        className="aspect-gold relative w-72"
        style={{
          transform: `rotateY(${x * 5}deg) rotateX(${y * -5}deg) translate3D(${
            x * 5
          }%,${y * 5}%,0)`,
          perspective: "600px",
        }}
      >
        <div
          className="h-full shadow-xl transition-all duration-500 card bg-base-100"
          style={{
            transform: `rotateY(${isFlip ? "180deg" : "0"})`,
            backfaceVisibility: "hidden",
          }}
        ></div>
        <div
          className="absolute inset-0 shadow-xl transition-all duration-500 card bg-neutral text-neutral-content"
          style={{
            transform: `rotateY(${isFlip ? "0" : "-180deg"})`,
            backfaceVisibility: "hidden",
          }}
        ></div>
      </div>
    </div>
  );
};
