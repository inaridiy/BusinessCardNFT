import { expect } from "chai";
import { arrayify, keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { ethers, upgrades } from "hardhat";
import { NameCard } from "../typechain";

const getSinger = () => ethers.getSigners();

const getContract = async () => {
  const [owner] = await getSinger();
  const NameCard = await ethers.getContractFactory("NameCard");
  const instance = await upgrades.deployProxy(NameCard, [
    "NFNameCard",
    await owner.getAddress(),
  ]);
  return instance as NameCard;
};

const signMessage = async (message: string) => {
  const [owner] = await getSinger();
  return await owner.signMessage(arrayify(keccak256(toUtf8Bytes(message))));
};

describe("Test of NameCard", () => {
  it("simple print test", async () => {
    const [owner] = await getSinger();
    const instance = await getContract();
    const signature = await signMessage("Hello World");
    await instance.print("Hello World", signature, false, false, 1000);
    expect(await instance.balanceOf(await owner.getAddress(), 1)).to.equal(
      1000
    );
    expect(await instance.uri(1)).to.equal("Hello World");
  });

  it("create ticket test", async () => {
    const instance = await getContract();
    await instance.print(
      "Hello World",
      await signMessage("Hello World"),
      false,
      false,
      1000
    );
    await instance.createTicket(1, "test ticket", 7 * 24 * 60 * 60, 10, false);
    const ticketMeta = await instance.ticket("test ticket");
    expect(ticketMeta.amount.toNumber()).to.equal(10);
    expect(ticketMeta.infinite).to.equal(false);
  });

  it("receive business card test", async () => {
    const [owner, account1] = await getSinger();
    const instance = await getContract();
    await instance.print(
      "Hello World",
      await signMessage("Hello World"),
      false,
      false,
      1000
    );
    await instance.createTicket(1, "test ticket", 7 * 24 * 60 * 60, 10, false);
    expect(await instance.balanceOf(await account1.getAddress(), 1)).to.equal(
      0
    );
    await instance.connect(account1).receiveCard("test ticket");
    expect(await instance.balanceOf(await account1.getAddress(), 1)).to.equal(
      1
    );

    expect((await instance.ticket("test ticket")).amount).to.equal(9);
    console.log(await instance.havingURI(account1.address));
  });

  it("test", async () => {
    const [owner, account1] = await getSinger();
    const instance = await getContract();
    await instance.print(
      "Hello World",
      await signMessage("Hello World"),
      false,
      false,
      1000
    );
    await instance.print(
      "Hello World2",
      await signMessage("Hello World2"),
      false,
      false,
      1000
    );

    await instance.createTicket(1, "test ticket", 7 * 24 * 60 * 60, 10, false);
    // console.log(await instance.createrURI(owner.address));
  });
});
