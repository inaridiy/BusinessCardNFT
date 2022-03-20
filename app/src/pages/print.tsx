import DefaultLayout from "@/components/DefaultLayout";
import { useContract } from "@/hooks/useContract";
import { useWeb3 } from "@/hooks/useWeb3";
import { CardMeta } from "@/types/cardMeta";
import { cardMetaToUrl } from "@/util/cardUtil";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

const handler =
  (cb: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
    cb(e.target.value);

const Home: NextPage = () => {
  const [meta, setMeta] = useState<CardMeta>({
    twitter: "",
    subtitle: "",
    name: "",
    icon: "",
    address: "",
    theme: "light",
    github: "",
  });
  const { account, isLoading, connectWallet } = useWeb3();
  const contract = useContract();

  const setter = (key: keyof CardMeta) => (value: string) =>
    setMeta({ ...meta, [key]: value });

  useEffect(() => {
    if (account) {
      setMeta({
        ...meta,
        address: account.id,
        name: meta.name || account.ethName || account.abbreviatedId,
      });
    }
  }, [account]);

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center m-2">
        <div className="flex-col flex gap-2 sm:max-w-sm  md:max-w-md w-full">
          <TextInput
            label="Name"
            placeholder="Type Your Name"
            value={meta.name}
            onChange={setter("name")}
          />
          <TextInput
            label="Message"
            placeholder="Type Message"
            value={meta.subtitle}
            onChange={setter("subtitle")}
          />
          <TextInput
            label="Icon"
            placeholder="Type Your Icon URL"
            value={meta.icon}
            onChange={setter("icon")}
          />

          <TextInput
            label="Twitter"
            placeholder="Type Your Twitter ID"
            value={meta.twitter}
            onChange={setter("twitter")}
          />
          <TextInput
            label="Github"
            placeholder="Type Your Github Name"
            value={meta.github}
            onChange={setter("github")}
          />
          <ThemeInput onChange={setter("theme")} />

          {isLoading ? (
            <button className="btn btn-primary loading">Loading</button>
          ) : account ? (
            <button className="btn btn-primary">Mint Your Card</button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => void connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
        <iframe
          src={cardMetaToUrl(meta)}
          className="artboard phone-2 rounded-lg shadow-sm hidden sm:block scale-75"
        />
      </div>
    </DefaultLayout>
  );
};

export const TextInput: React.FC<{
  label: string;
  placeholder: string;
  onChange: (s: string) => void;
  value: string;
}> = ({ onChange, value, label, placeholder }) => {
  const { isLoading } = useWeb3();
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
        onChange={handler(onChange)}
        disabled={isLoading}
      />
    </div>
  );
};

export const ThemeInput: React.FC<{ onChange: (s: string) => void }> = ({
  onChange,
}) => {
  const { isLoading } = useWeb3();

  const [themeIndex, setIndex] = useState("1");
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
        disabled={isLoading}
      />
    </div>
  );
};
export const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default Home;
