import DefaultLayout from "@/components/DefaultLayout";
import { Web3Context } from "@/components/Web3Provider";
import { useContract } from "@/hooks/useContract";
import { useWeb3 } from "@/hooks/useWeb3";
import { CardMeta } from "@/types/cardMeta";
import { cardMetaToUrl, cardUri } from "@/util/cardUtil";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";

const handler =
  (cb: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
    cb(e.target.value);

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <PrintBody />
    </DefaultLayout>
  );
};

export const PrintBody = () => {
  const [meta, setMeta] = useState<CardMeta>({
    twitter: "",
    subtitle: "",
    name: "",
    icon: "",
    address: "",
    theme: "light",
    github: "",
  });
  const [isEditable, setEditable] = useState(false);
  const [isTransferable, setTransferable] = useState(false);
  const { account, isLoading, connectWallet, isTargetChain } =
    useContext(Web3Context);
  const contract = useContract();

  const setter = (key: keyof CardMeta) => (value: string) =>
    setMeta({ ...meta, [key]: value });

  const print = async () => {
    if (contract) {
      await contract.print(cardUri(meta), isTransferable, isEditable, 1000);
      const ticket = nanoid().slice(0, 6);
      await contract.mintTicket(ticket, 365, 1, true);
      console.log(ticket);
    }
  };

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
        <div className="flex gap-8">
          <ToggleInput value={isEditable} onChange={setEditable}>
            Editable
          </ToggleInput>
          <ToggleInput value={isTransferable} onChange={setTransferable}>
            Transferable
          </ToggleInput>
        </div>
        <ThemeInput onChange={setter("theme")} />

        {isLoading ? (
          <button className="btn btn-primary loading">Loading</button>
        ) : !isTargetChain ? (
          <button className="btn btn-error" disabled>
            Chain is different.
          </button>
        ) : account ? (
          <button className="btn btn-primary" onClick={() => void print()}>
            Mint Your Card
          </button>
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
