import { ethers } from "hardhat";

async function main() {

    const [Deployer] = await ethers.getSigners();
    console.log("Account Deployer:", Deployer.address);

    const MemeCoin = await ethers.getContractFactory("MemeCoin");
    const memeCoin = await MemeCoin.deploy(Deployer);
    console.log("MemeCoin Address:", await memeCoin.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
