import Card from "@/components/card";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import {
  TextAreaInput,
  TextInput,
  ThemeInput,
  ToggleInput,
} from "@/components/ui/input";
import { UsefulButton } from "@/components/UsefulBtn";
import { useContract, useInputs, useWeb3 } from "@/hooks";
import { closeModal } from "@/util";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import invariant from "tiny-invariant";

export default function Page() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isEditable, setEditable] = useState(false);
  const [isTransferable, setTransferable] = useState(false);
  const { isLoading, account } = useWeb3();
  const contract = useContract("astar");
  const { value, handler, setter, margeValue } = useInputs({
    address: "0x4aCc9c9eaFF1cf0e599dCb7a7164Cf2328224ca2",
    name: "",
    icon: "",
    description: "",
    github: "",
    twitter: "",
    theme: "light",
    cyberConnect: "",
  });

  const mint = async () => {
    try {
      setError("");
      setStatus("UploadMetaData to IPFS");
      invariant(contract);
      const res = await fetch("/api/metadata", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const { uri, signature } = (await res.json()) as {
        uri: string;
        signature: string;
      };
      setStatus("Mint Meishi on BlockChain");
      const tx = await contract.print(
        uri,
        signature,
        isTransferable,
        isEditable,
        1000
      );
      await tx.wait();
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ? String(err.message) : String(e));
    } finally {
      setStatus("");
    }
  };

  useEffect(() => {
    if (account) {
      margeValue({
        address: account.id,
        cyberConnect: account.id,
        name: account.ethName || account.abbreviatedId,
      });
    }
  }, [account]);

  return (
    <>
      <div className="modal" id="preview" onClick={closeModal}>
        <div className="scale-75">
          <Card {...value} />
        </div>
      </div>
      <div
        className={`modal modal-bottom sm:modal-middle ${
          status && "modal-open"
        }`}
        id="status"
      >
        <div className="modal-box">
          <button className="btn loading btn-ghost w-full"></button>
          <p className="text-2xl font-bold text-center">{status}</p>
        </div>
      </div>
      <div className="h-full container mx-auto relative sm:flex items-center justify-center">
        <div className="flex-col flex card-body mb-24 max-w-lg">
          <a className="btn btn-outline sm:hidden" href="#preview">
            Preview
          </a>
          <TextInput
            label="Name"
            placeholder="type your name"
            value={value.name}
            onChange={handler("name")}
            disabled={isLoading}
          />
          <TextInput
            label="Icon URL"
            placeholder="type your icon URL"
            value={value.icon}
            onChange={handler("icon")}
            disabled={isLoading}
          />
          <TextAreaInput
            label="Description"
            placeholder="markdown"
            value={value.description}
            onChange={handler("description")}
            disabled={isLoading}
          />
          <TextInput
            label="Github"
            placeholder="hogehoge"
            value={value.github}
            onChange={handler("github")}
            disabled={isLoading}
          />
          <TextInput
            label="Twitter"
            placeholder="@hoge"
            value={value.twitter}
            onChange={handler("twitter")}
            disabled={isLoading}
          />
          <div className="flex gap-8">
            <ToggleInput value={isEditable} onChange={setEditable}>
              Editable
            </ToggleInput>
            <ToggleInput value={isTransferable} onChange={setTransferable}>
              Transferable
            </ToggleInput>
          </div>
          <ThemeInput onChange={setter("theme")} disabled={isLoading} />
          {error && (
            <div className="alert alert-error font-bold">
              <div>
                <AiOutlineCloseCircle
                  className="stroke-current"
                  size="2.5rem"
                />
                <span>{error}</span>
              </div>
            </div>
          )}
          <UsefulButton className="btn" onClick={() => void mint()}>
            Mint
          </UsefulButton>
        </div>
        <div className="hidden sm:block h-full">
          <Card {...value} />
        </div>
      </div>
    </>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayoutWithProvider>{page}</DefaultLayoutWithProvider>;
};
