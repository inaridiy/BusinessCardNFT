import { stopPropagation } from "@/utils";
import clsx from "clsx";

export const ModalBase: React.VFC<{
  children?: React.ReactNode;
  pos?: "auto" | "middle" | "bottom";
  open: boolean;
  className?: string;
  onChange?: (open: boolean) => void;
}> = ({ children, pos = "auto", open, onChange, className }) => {
  return (
    <div
      className={clsx(
        "modal",
        open && "modal-open",
        pos === "auto" && "modal-bottom sm:modal-middle",
        pos === "middle" && "modal-middle",
        pos === "bottom" && "modal-bottom"
      )}
      onClick={() => onChange && onChange(false)}
    >
      <div className={className || "modal-box"} onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
};
