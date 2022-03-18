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

  it("Burn ticket", async () => {
    const bcard = await getContract();
    await bcard.print("Hello World", false, false, 1000);
    await bcard.issueTicket(1, "test ticket", 7, 10, false);
    await bcard.burnTicket("test ticket");
    expect((await bcard.ticket("test ticket")).amount).to.equal(0);
  });

  it("Transfer ticket", async () => {
    const [, addr1, addr2] = await getSinger();
    const bcard = await getContract();
    await bcard.print("Hello World", true, false, 1000);
    await bcard.issueTicket(1, "test ticket", 7, 1, false);
    await bcard.connect(addr1).receiveCard("test ticket");
    await bcard
      .connect(addr1)
      .safeTransferFrom(
        await addr1.getAddress(),
        await addr2.getAddress(),
        1,
        1,
        []
      );
    expect(await bcard.balanceOf(await addr2.getAddress(), 1)).to.equal(1);
  });

  it("Transfer non-transferable ticket", async () => {
    const [, addr1, addr2] = await getSinger();
    const bcard = await getContract();
    await bcard.print("Hello World", false, false, 1000);
    await bcard.issueTicket(1, "test ticket", 7, 1, false);
    await bcard.connect(addr1).receiveCard("test ticket");

    await expect(
      bcard
        .connect(addr1)
        .safeTransferFrom(
          await addr1.getAddress(),
          await addr2.getAddress(),
          1,
          1,
          []
        )
    ).to.be.revertedWith("non-transferable");
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
    await bcard.issueTicket(1, "test ticket0", 7, 10, false);
    await expect(
      bcard.issueTicket(1, "test ticket0", 7, 10, false)
    ).to.be.revertedWith("Tickets that already exist.");
    await expect(
      bcard.connect(addr1).issueTicket(1, "test ticket1", 7, 10, false)
    ).to.be.revertedWith(`It's not your card.`);
    await expect(
      bcard.issueTicket(2, "test ticket2", 7, 10, false)
    ).to.be.revertedWith(`It's not your card.`);
  });

  it("Exceptions to Receive Processing", async () => {
    const [, addr1, ...other] = await getSinger();
    const bcard = await getContract();
    await bcard.print("Hello World", false, false, 1000);
    await bcard.issueTicket(1, "test ticket1", 0, 10, false); // 有効期限が切れているチケット
    await bcard.issueTicket(1, "test ticket2", 7, 1, false); // 1枚しかないチケット
    await bcard.issueTicket(1, "test ticket3", 7, 10, false);
    await bcard.issueTicket(1, "test ticket4", 7, 0, true);
    await bcard.receiveCard("test ticket2");
    await bcard.connect(addr1).receiveCard("test ticket3");
    await expect(
      bcard.connect(addr1).receiveCard("Non-existent tickets")
    ).to.be.revertedWith("Ticket does not exist.");
    await expect(
      bcard.connect(addr1).receiveCard("test ticket1")
    ).to.be.revertedWith("Ticket has expired.");
    await expect(
      bcard.connect(addr1).receiveCard("test ticket2")
    ).to.be.revertedWith("Ticket not available.");
    await expect(
      bcard.connect(addr1).receiveCard("test ticket3")
    ).to.be.revertedWith("You have already received it.");
    for (const addr of other) {
      await bcard.connect(addr).receiveCard("test ticket4");
    }
  });

  it("Exceptions to burning", async () => {
    const [, addr1] = await getSinger();
    const bcard = await getContract();
    await bcard.print("Hello World", false, false, 1000);
    await bcard.issueTicket(1, "test ticket", 7, 10, false);
    await expect(bcard.burnTicket("Non-existent tickets")).to.be.revertedWith(
      "Ticket does not exist."
    );
    await expect(
      bcard.connect(addr1).burnTicket("test ticket")
    ).to.be.revertedWith("It's not your ticket.");
  });
});
