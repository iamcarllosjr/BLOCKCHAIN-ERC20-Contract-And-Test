import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const { RPC_ALCHEMY_API_KEY, WALLET_PRIVATE_KEY, API_POLYGON_SCAN } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: RPC_ALCHEMY_API_KEY,
      accounts: [`0x${WALLET_PRIVATE_KEY}`],
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: API_POLYGON_SCAN,
  },
  sourcify: {
    enabled: true
  }
};

export default config;
