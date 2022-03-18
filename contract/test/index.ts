import { expect } from "chai";
import { ethers } from "hardhat";

const getContract = async () => {
  const BusinessCard = await ethers.getContractFactory("BusinessCard");
  const bcard = await BusinessCard.deploy();
  await bcard.deployed();
  return bcard;
};

const getSinger = () => ethers.getSigners();

describe("Test of BusinessCard", () => {
  it("normal print test", async () => {
    const [owner] = await getSinger();
    const bcard = await getContract();
    await bcard.print("Hello World", false, false, 1000);
    expect(await bcard.balanceOf(await owner.getAddress(), 1)).to.equal(1000);
    expect(await bcard.uri(1)).to.equal("Hello World");
  });

  it("issue ticket test", async () => {
    const bcard = await getContract();
    await bcard.print("Hello World", false, false, 1000);
    await bcard.issueTicket(1, "test ticket", 7, 10, false);
    const ticketMeta = await bcard.ticket("test ticket");
    expect(ticketMeta.amount.toNumber()).to.equal(10);
    expect(ticketMeta.infinite).to.equal(false);
    // const effectiveDate = new Date(ticketMeta.effectiveAt.toNumber() * 1000);
    // console.log("Effective Date", effectiveDate.toISOString());
  });

  it("receive business card", async () => {
    const [, addr1] = await getSinger();
    const bcard = await getContract();
    await bcard.print("Hello World", false, false, 1000);
    await bcard.issueTicket(1, "test ticket", 7, 10, false);
    expect(await bcard.balanceOf(await addr1.getAddress(), 1)).to.equal(0);
    await bcard.connect(addr1).receiveCard("test ticket");
    expect(await bcard.balanceOf(await addr1.getAddress(), 1)).to.equal(1);
    expect((await bcard.ticket("test ticket")).amount).to.equal(9);
  });

  it("Edit business card", async () => {
    const bcard = await getContract();
    await bcard.print("Hello World", false, true, 1000);
    await bcard.edit(1, "Goodbye World");
    expect(await bcard.uri(1)).to.equal("Goodbye World");
  });

  it("Editing Process Exceptions", async () => {
    const bcard = await getContract();
    const [, addr1] = await getSinger();
    await bcard.print("Hello World", false, false, 1000);

    await expect(bcard.edit(1, "Not your data.")).to.be.revertedWith(
      "Editing is not permitted."
    );
    await expect(
      bcard.connect(addr1).edit(1, "Not your data.")
    ).to.be.revertedWith("It's not your card.");
    await expect(
      bcard.edit(2, "Data that should not exist.")
    ).to.be.revertedWith("It's not your card.");
  });

  it("Exceptions to Ticket Issuance", async () => {
    const [, addr1] = await getSinger();
    const bcard = await getContract();

    await bcard.print("Hello World", false, false, 1000);
    await expect(
      bcard.connect(addr1).issueTicket(1, "test ticket", 7, 10, false)
    ).to.be.revertedWith(`It's not your card.`);

    await expect(
      bcard.issueTicket(2, "test ticket", 7, 10, false)
    ).to.be.revertedWith(`It's not your card.`);
  });

  it("Exceptions to Receive Processing", async () => {
    const [, addr1] = await getSinger();
  });
});
