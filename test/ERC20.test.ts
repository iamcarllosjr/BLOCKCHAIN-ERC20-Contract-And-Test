import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MemeCoin", function () {
 
  async function deployFixture() {
   
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MemeCoin = await ethers.getContractFactory("MemeCoin");
    const memeCoin = await MemeCoin.deploy(owner);
   
    return { memeCoin, owner, otherAccount };
  }

    it("Should has correct Name", async function () {
      const { memeCoin } = await loadFixture(deployFixture);
      const name = await memeCoin.name();
      expect(name).to.equal("MemeCoin");
    });

    //Teste de sucesso usar o await dentro do expect, ou passar o valor da variável
    it("Should mint news tokens", async function () {
      const qty = 10n * 10n ** 18n;
      const { memeCoin, owner } = await loadFixture(deployFixture);
      expect(await memeCoin.connect(owner).mint(owner.address, qty));
    });
    
    //await para esperar um retorno de função
    it("Should supply is greateThan 0", async function () {
      const { memeCoin, owner } = await loadFixture(deployFixture);
      const balanceOwnerNow = await memeCoin.balanceOf(owner.address);
      expect(balanceOwnerNow).greaterThan(0);
    });
    
    // Tenta chamar a função mint como o owner e espera que NÃO reverta
    //Teste de fracasso usar o await fora do expect, e testar com reverted ou outra coisa
    it("Should minting is the owner", async function () {
      const qty = 10n * 10n ** 18n;
      const { memeCoin, owner } = await loadFixture(deployFixture);
      await expect(memeCoin.connect(owner).mint(owner.address, qty)).to.not.be.reverted;
    });
    
    // Tenta chamar a função mint como NOT owner e espera que reverta
    //Teste de fracasso usar o await fora do expect, e testar com reverted ou outra coisa
    it("Whoever is minting is not the owner", async function () {
      const qty = 10n * 10n ** 18n;
      const { memeCoin, otherAccount } = await loadFixture(deployFixture);
      await expect(memeCoin.connect(otherAccount).mint(otherAccount.address, qty)).to.be.revertedWithCustomError(memeCoin, "OwnableUnauthorizedAccount");
    });
});
