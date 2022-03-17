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
  });
});
