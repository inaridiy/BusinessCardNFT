// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  const Greeter = await ethers.getContractFactory("MeishiNFT");
  const greeter = await upgrades.deployProxy(Greeter, [
    "MeishiNFT",
    "0xbc7AfB04e462C42AcD5fE1d8760158D63f8eE984",
  ]);

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
