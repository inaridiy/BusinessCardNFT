import { themes } from "@/util/config";
import { useEffect, useState } from "react";
export const TextInput: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onChange, value, label, placeholder, disabled }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text  font-bold text-lg">{label}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export const ThemeInput: React.FC<{
  onChange: (s: string) => void;
  disabled?: boolean;
}> = ({ onChange, disabled }) => {
  const [themeIndex, setIndex] = useState("1");

  const handler =
    (cb: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      cb(e.target.value);
  useEffect(() => {
    onChange(themes[Number(themeIndex) - 1]);
  }, [themeIndex]);
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text  font-bold text-lg">Theme</span>
      </label>
      <input
        type="range"
        min="1"
        max="28"
        value={themeIndex}
        onChange={handler(setIndex)}
        className="range"
        step="1"
        disabled={disabled}
      />
    </div>
  );
};

export const ToggleInput: React.FC<{
  children: React.ReactNode;
  onChange: (s: boolean) => void;
  value: boolean;
}> = ({ children, value, onChange }) => {
  return (
    <div className="form-control">
      <label className="label-text font-bold text-lg ">{children}</label>
      <input
        type="checkbox"
        className="toggle"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};
