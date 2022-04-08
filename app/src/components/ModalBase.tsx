const ModalBase: React.FC<{
  open: boolean;
  onChange?: (v: boolean) => void;
  mode?: "middle" | "bottom" | "auto";
  children?: React.ReactNode;
}> = ({ open, onChange, children, mode }) => (
  <div
    className={`modal ${open ? "modal-open" : ""} ${
      mode === "auto"
        ? "modal-bottom sm:modal-middle"
        : mode === "bottom"
        ? " modal-bottom"
        : ""
    }`}
    onClick={() => onChange && onChange(false)}
  >
    {open && children}
  </div>
);

export default ModalBase;
