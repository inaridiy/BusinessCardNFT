import Card from "@/components/card";
import DefaultLayoutWithProvider from "@/components/DefaultLayout";
import ModalBase from "@/components/ModalBase";
import {
  TextAreaInput,
  TextInput,
  ThemeInput,
  ToggleInput,
} from "@/components/ui/input";
import { UsefulButton } from "@/components/UsefulBtn";
import { useContract, useInputs, useWeb3 } from "@/hooks";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import invariant from "tiny-invariant";

export default function Page() {
  const [status, setStatus] = useState("");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [isTransferable, setTransferable] = useState(false);
  const [isInfinite, setIsInfinite] = useState(false);
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
  const {
    value: ticketValue,
    handler: ticketHandler,
    setter: ticketSetter,
  } = useInputs({
    effectiveTime: "7",
    amount: "10",
    ticket: "",
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
      setStatus("Create Ticket");
      setStep(1);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ? String(err.message) : String(e));
    }
  };

  const createTicket = async () => {
    try {
      if (contract && account) {
        setStep(2);
        setStatus("Create Ticket On Block Chain");
        const id = (await contract.createrIds(account.id)).slice(-1)[0];
        invariant(id);
        const ticket = nanoid().slice(0, 7);
        const tx = await contract.createTicket(
          id,
          ticket,
          Number(ticketValue.effectiveTime) * 24 * 60 * 60,
          ticketValue.amount,
          isInfinite
        );
        await tx.wait();
        ticketSetter("ticket")(ticket);
        setStatus(`ticket is ${ticket}`);
      }
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ? String(err.message) : String(e));
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
      <ModalBase open={isPreview} onChange={setIsPreview}>
        <div className="scale-75 sm:scale-110">
          <Card {...value} />
        </div>
      </ModalBase>
      <ModalBase
        open={Boolean(status && (step === 0 || step === 2))}
        mode="auto"
      >
        <div className="modal-box">
          <span className="btn loading btn-ghost w-full" />
          <p className="text-2xl font-bold text-center">{status}</p>
        </div>
      </ModalBase>
      <ModalBase open={Boolean(status && step === 1)} mode="auto">
        <div className="modal-box">
          <p className="text-2xl font-bold text-center">{status}</p>
          {isInfinite || (
            <TextInput
              label="Effective Count"
              placeholder="1"
              value={ticketValue.amount}
              onChange={ticketHandler("amount")}
            />
          )}
          <TextInput
            label="effective date"
            placeholder="7 days"
            value={ticketValue.effectiveTime}
            onChange={ticketHandler("effectiveTime")}
          />
          <ToggleInput value={isInfinite} onChange={setIsInfinite}>
            Is Infinite
          </ToggleInput>
          <div className="modal-action">
            <UsefulButton
              className="btn btn-primary"
              onClick={() => void createTicket()}
              disabled={
                isNaN(Number(ticketValue.amount)) ||
                isNaN(Number(ticketValue.effectiveTime))
              }
            >
              Create Ticket
            </UsefulButton>
          </div>
        </div>
      </ModalBase>

      <div className="h-full container mx-auto relative sm:flex items-center justify-center">
        <div className="flex-col flex card-body mb-24 max-w-lg">
          <button
            className="btn btn-outline sm:hidden"
            onClick={() => setIsPreview(true)}
          >
            Preview
          </button>
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
          <UsefulButton
            className="btn"
            target="astar"
            onClick={() => void mint()}
          >
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
