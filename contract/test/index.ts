import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { arrayify, keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { ethers, upgrades } from "hardhat";
import { NameCard } from "../typechain";

const getSinger = () => ethers.getSigners();

const getContract = async () => {
  const [owner] = await getSinger();
  const NameCard = await ethers.getContractFactory("NameCard");
  console.log(await owner.getAddress());
  const instance = await upgrades.deployProxy(NameCard, [
    "NFNameCard",
    await owner.getAddress(),
  ]);
  return instance as NameCard;
};

const signMessage = (accout: SignerWithAddress, message: string) =>
  accout.signMessage(arrayify(keccak256(toUtf8Bytes(message))));

describe("Test of NameCard", () => {
  it("simple print test", async () => {
    const [owner] = await getSinger();
    const instance = await getContract();
    const signature = await signMessage(owner, "Hello World");
    await instance.print("Hello World", signature, false, false, 1000);
    console.log(await instance.uri(1));
  });
});
