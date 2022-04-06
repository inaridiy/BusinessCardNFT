import { ethers, upgrades } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("NameCard");
  const instance = await upgrades.deployProxy(Factory, [
    "NFMeishi",
    "0xbc7AfB04e462C42AcD5fE1d8760158D63f8eE984",
  ]);

  await instance.deployed();

  console.log("Contract deployed to:", instance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
